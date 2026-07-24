const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const prisma = require('./db');
const { encryptPayload, decryptPayload } = require('../utils/chat.encryption');

let io = null;
const onlineUsersMap = new Map(); // agencyId -> Map(userId -> socketId)

const initSocket = (httpServer) => {
  const clientUrls = (process.env.CLIENT_URL || '')
    .split(',')
    .map(url => url.trim())
    .filter(Boolean);

  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
        const isAllowedDomain = origin.endsWith('.railway.app') || origin.endsWith('.kiaansoftware.com');
        const isClientUrl = clientUrls.includes(origin);
        const isDev = process.env.NODE_ENV !== 'production';

        if (isLocalhost || isAllowedDomain || isClientUrl || isDev) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true
    }
  });

  // Socket Authentication Middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || 
                    socket.handshake.query?.token ||
                    (socket.handshake.headers?.authorization || '').replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication failed: Missing token'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vktori_legal_secret_key_2024');
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, full_name: true, email: true, role: true, roles: true, agency_id: true, is_active: true }
      });

      if (!user || !user.is_active) {
        return next(new Error('Authentication failed: Invalid or inactive user'));
      }

      const primaryRole = user.roles?.length ? user.roles[0].role : user.role;
      if (primaryRole === 'super_admin' || primaryRole === 'superadmin') {
        return next(new Error('Super Admin is not authorized to join chat sockets'));
      }

      socket.user = {
        ...user,
        role: primaryRole,
        agency_id: user.agency_id || 1
      };

      next();
    } catch (err) {
      console.error('Socket Auth Error:', err.message);
      return next(new Error('Authentication failed: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.user;
    const agencyId = user.agency_id;
    const agencyRoom = `agency_${agencyId}`;
    const userRoom = `agency_${agencyId}:user_${user.id}`;

    // Join Tenant Agency Room & Personal User Room
    socket.join(agencyRoom);
    socket.join(userRoom);

    // Track Online Users per Agency
    if (!onlineUsersMap.has(agencyId)) {
      onlineUsersMap.set(agencyId, new Map());
    }
    const agencyOnlineMap = onlineUsersMap.get(agencyId);
    agencyOnlineMap.set(user.id, socket.id);

    // Broadcast Online Status to Agency Room
    io.to(agencyRoom).emit('user:online_list', Array.from(agencyOnlineMap.keys()));

    // Join All Active Conversation Rooms for User
    prisma.conversationParticipant.findMany({
      where: { user_id: user.id, conversation: { agency_id: agencyId } },
      select: { conversation_id: true }
    }).then(participants => {
      participants.forEach(p => {
        socket.join(`agency_${agencyId}:conv_${p.conversation_id}`);
      });
    }).catch(err => console.error('Error joining conv rooms:', err));

    // Event: Join specific conversation room dynamically
    socket.on('chat:join_conversation', ({ conversationId }) => {
      if (conversationId) {
        socket.join(`agency_${agencyId}:conv_${conversationId}`);
      }
    });

    // Event: Send Message
    socket.on('chat:send_message', async ({ conversationId, text, attachments }, callback) => {
      try {
        const convId = Number(conversationId);
        // Verify tenant participation
        const isParticipant = await prisma.conversationParticipant.findUnique({
          where: { conversation_id_user_id: { conversation_id: convId, user_id: user.id } }
        });

        if (!isParticipant) {
          if (callback) callback({ success: false, error: 'Access denied' });
          return;
        }

        const encryptedBody = encryptPayload(text);
        const newMsg = await prisma.chatMessage.create({
          data: {
            conversation_id: convId,
            sender_id: user.id,
            agency_id: agencyId,
            encrypted_body: encryptedBody,
            attachments: attachments && attachments.length > 0 ? attachments : null,
            is_encrypted: true
          },
          include: { sender: { select: { id: true, full_name: true, role: true } } }
        });

        await prisma.conversation.update({
          where: { id: convId },
          data: { updated_at: new Date() }
        });

        await prisma.conversationParticipant.update({
          where: { conversation_id_user_id: { conversation_id: convId, user_id: user.id } },
          data: { last_read_at: new Date() }
        });

        const formattedMsg = {
          id: newMsg.id,
          conversationId: convId,
          senderId: user.id,
          senderName: user.full_name,
          senderRole: user.role,
          text: text,
          attachments: newMsg.attachments || [],
          isEncrypted: true,
          createdAt: newMsg.created_at
        };

        // Broadcast message to room scoped by agency & conversation
        io.to(`agency_${agencyId}:conv_${convId}`).emit('chat:message_received', formattedMsg);

        // Notify participants who are not currently viewing room
        const convParticipants = await prisma.conversationParticipant.findMany({
          where: { conversation_id: convId },
          select: { user_id: true }
        });

        convParticipants.forEach(p => {
          if (p.user_id !== user.id) {
            io.to(`agency_${agencyId}:user_${p.user_id}`).emit('chat:unread_badge_update', {
              conversationId: convId,
              message: formattedMsg
            });
          }
        });

        if (callback) callback({ success: true, message: formattedMsg });
      } catch (err) {
        console.error('Socket send_message error:', err.message);
        if (callback) callback({ success: false, error: err.message });
      }
    });

    // Event: Typing Start
    socket.on('chat:typing_start', ({ conversationId }) => {
      socket.to(`agency_${agencyId}:conv_${conversationId}`).emit('chat:user_typing', {
        conversationId,
        userId: user.id,
        userName: user.full_name
      });
    });

    // Event: Typing Stop
    socket.on('chat:typing_stop', ({ conversationId }) => {
      socket.to(`agency_${agencyId}:conv_${conversationId}`).emit('chat:user_stop_typing', {
        conversationId,
        userId: user.id
      });
    });

    // Event: Mark Read
    socket.on('chat:mark_read', async ({ conversationId }) => {
      try {
        const convId = Number(conversationId);
        await prisma.conversationParticipant.update({
          where: { conversation_id_user_id: { conversation_id: convId, user_id: user.id } },
          data: { last_read_at: new Date() }
        });

        io.to(`agency_${agencyId}:conv_${convId}`).emit('chat:read_receipt', {
          conversationId: convId,
          userId: user.id,
          readAt: new Date()
        });
      } catch (err) {
        console.error('Socket mark_read error:', err.message);
      }
    });

    // Event: Disconnect
    socket.on('disconnect', () => {
      if (onlineUsersMap.has(agencyId)) {
        const agencyOnlineMap = onlineUsersMap.get(agencyId);
        agencyOnlineMap.delete(user.id);
        io.to(agencyRoom).emit('user:online_list', Array.from(agencyOnlineMap.keys()));
      }
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO is not initialized');
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};
