const prisma = require('../../config/db');
const { encryptPayload, decryptPayload } = require('../../utils/chat.encryption');

/**
 * Get contacts eligible for starting a conversation based on role & agency isolation
 */
const getContacts = async (user) => {
  const userRole = user.role || (user.roles && user.roles[0]);
  const agencyId = user.agency_id || 1;

  if (userRole === 'super_admin' || userRole === 'superadmin') {
    throw new Error('Super Admin does not have access to Chat');
  }

  // Base query: Active users in the same agency (excluding current user)
  let whereCondition = {
    agency_id: agencyId,
    is_active: true,
    id: { not: user.id },
  };

  // Role-specific filtering
  if (userRole === 'client') {
    // Client can chat with legal team assigned to their matters or admin
    const clientRecord = await prisma.client.findFirst({ where: { user_id: user.id } });
    if (clientRecord) {
      const assignedMatters = await prisma.matter.findMany({
        where: {
          OR: [{ client_id: clientRecord.id }, { parties: { some: { id: clientRecord.id } } }]
        },
        select: { assigned_lawyer_id: true, created_by_user_id: true }
      });
      const staffUserIds = new Set();
      assignedMatters.forEach(m => {
        if (m.assigned_lawyer_id) staffUserIds.add(m.assigned_lawyer_id);
        if (m.created_by_user_id) staffUserIds.add(m.created_by_user_id);
      });
      // Also allow chatting with Agency Admins
      whereCondition = {
        agency_id: agencyId,
        is_active: true,
        id: { not: user.id },
        OR: [
          { id: { in: Array.from(staffUserIds) } },
          { role: 'admin' },
          { roles: { some: { role: 'admin' } } }
        ]
      };
    }
  } else if (userRole === 'paralegal') {
    // Paralegal can chat with lawyers, admins, partners and clients
    whereCondition.role = { in: ['lawyer', 'admin', 'partner', 'client', 'paralegal'] };
  }

  const contacts = await prisma.user.findMany({
    where: whereCondition,
    select: {
      id: true,
      full_name: true,
      email: true,
      role: true,
      roles: true,
      last_login_at: true,
      lawyer: { select: { practice_focus: true, display_name: true } }
    },
    orderBy: { full_name: 'asc' }
  });

  return contacts.map(c => ({
    id: c.id,
    name: c.full_name,
    email: c.email,
    role: c.roles?.length ? c.roles[0].role : c.role,
    subtitle: c.lawyer?.practice_focus || c.role,
    lastLogin: c.last_login_at
  }));
};

/**
 * List conversations for current user inside agency
 */
const listConversations = async (user) => {
  const agencyId = user.agency_id || 1;

  const participants = await prisma.conversationParticipant.findMany({
    where: {
      user_id: user.id,
      conversation: { agency_id: agencyId }
    },
    include: {
      conversation: {
        include: {
          matter: { select: { id: true, matter_number: true, title: true } },
          participants: {
            include: {
              user: { select: { id: true, full_name: true, email: true, role: true } }
            }
          },
          messages: {
            take: 1,
            orderBy: { created_at: 'desc' },
            include: { sender: { select: { id: true, full_name: true } } }
          }
        }
      }
    },
    orderBy: { conversation: { updated_at: 'desc' } }
  });

  const conversations = await Promise.all(participants.map(async (p) => {
    const conv = p.conversation;
    const lastMsg = conv.messages[0];
    const otherParticipants = conv.participants
      .filter(pt => pt.user_id !== user.id)
      .map(pt => pt.user);

    // Calculate unread count
    const lastReadAt = p.last_read_at || new Date(0);
    const unreadCount = await prisma.chatMessage.count({
      where: {
        conversation_id: conv.id,
        created_at: { gt: lastReadAt },
        sender_id: { not: user.id }
      }
    });

    let displayTitle = conv.title;
    if (!displayTitle && conv.type === 'private') {
      displayTitle = otherParticipants.map(u => u.full_name).join(', ') || 'Private Chat';
    } else if (!displayTitle && conv.matter) {
      displayTitle = `Matter: ${conv.matter.matter_number} - ${conv.matter.title}`;
    }

    return {
      id: conv.id,
      type: conv.type,
      title: displayTitle,
      matterId: conv.matter_id,
      matterNumber: conv.matter?.matter_number,
      updatedAt: conv.updated_at,
      unreadCount,
      otherParticipants: otherParticipants.map(u => ({
        id: u.id,
        name: u.full_name,
        role: u.role
      })),
      lastMessage: lastMsg ? {
        id: lastMsg.id,
        senderId: lastMsg.sender_id,
        senderName: lastMsg.sender?.full_name,
        text: decryptPayload(lastMsg.encrypted_body),
        createdAt: lastMsg.created_at,
        hasAttachments: Boolean(lastMsg.attachments && Array.isArray(lastMsg.attachments) && lastMsg.attachments.length > 0)
      } : null
    };
  }));

  return conversations;
};

/**
 * Get existing private conversation or create new one
 */
const getOrCreatePrivateConversation = async (user, targetUserId) => {
  const agencyId = user.agency_id || 1;

  if (Number(user.id) === Number(targetUserId)) {
    throw new Error('Cannot start conversation with yourself');
  }

  // Ensure target user is in same agency
  const targetUser = await prisma.user.findFirst({
    where: { id: Number(targetUserId), agency_id: agencyId, is_active: true }
  });
  if (!targetUser) {
    throw new Error('Target user not found or outside agency');
  }

  // Check for existing private conversation with both users
  const existingConv = await prisma.conversation.findFirst({
    where: {
      agency_id: agencyId,
      type: 'private',
      AND: [
        { participants: { some: { user_id: user.id } } },
        { participants: { some: { user_id: Number(targetUserId) } } }
      ]
    },
    include: {
      participants: {
        include: { user: { select: { id: true, full_name: true, role: true } } }
      }
    }
  });

  if (existingConv) {
    return existingConv;
  }

  // Create new private conversation
  const newConv = await prisma.conversation.create({
    data: {
      agency_id: agencyId,
      type: 'private',
      participants: {
        create: [
          { user_id: user.id, last_read_at: new Date() },
          { user_id: Number(targetUserId), last_read_at: new Date(0) }
        ]
      }
    },
    include: {
      participants: {
        include: { user: { select: { id: true, full_name: true, role: true } } }
      }
    }
  });

  return newConv;
};

/**
 * Get messages for a conversation
 */
const getMessages = async (user, conversationId, { limit = 50, page = 1 }) => {
  const agencyId = user.agency_id || 1;

  // Verify participant
  const isParticipant = await prisma.conversationParticipant.findUnique({
    where: {
      conversation_id_user_id: {
        conversation_id: Number(conversationId),
        user_id: user.id
      }
    }
  });

  if (!isParticipant) {
    throw new Error('Access denied: You are not a participant in this conversation');
  }

  const messages = await prisma.chatMessage.findMany({
    where: {
      conversation_id: Number(conversationId),
      agency_id: agencyId
    },
    take: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
    orderBy: { created_at: 'asc' },
    include: {
      sender: { select: { id: true, full_name: true, role: true } }
    }
  });

  return messages.map(m => ({
    id: m.id,
    conversationId: m.conversation_id,
    senderId: m.sender_id,
    senderName: m.sender?.full_name,
    senderRole: m.sender?.role,
    text: decryptPayload(m.encrypted_body),
    attachments: m.attachments || [],
    isEncrypted: m.is_encrypted,
    isEdited: m.is_edited,
    isDeleted: m.is_deleted,
    createdAt: m.created_at,
  }));
};

/**
 * Send encrypted message
 */
const sendMessage = async (user, { conversationId, text = '', attachments = [] }) => {
  const agencyId = user.agency_id || 1;
  const convId = Number(conversationId);

  // Check participation
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversation_id_user_id: {
        conversation_id: convId,
        user_id: user.id
      }
    }
  });

  if (!participant) {
    throw new Error('Not authorized to send message to this conversation');
  }

  const encryptedBody = encryptPayload(text);

  const message = await prisma.chatMessage.create({
    data: {
      conversation_id: convId,
      sender_id: user.id,
      agency_id: agencyId,
      encrypted_body: encryptedBody,
      attachments: attachments && attachments.length > 0 ? attachments : null,
      is_encrypted: true
    },
    include: {
      sender: { select: { id: true, full_name: true, role: true } }
    }
  });

  // Update conversation updated_at
  await prisma.conversation.update({
    where: { id: convId },
    data: { updated_at: new Date() }
  });

  // Update sender last_read_at
  await prisma.conversationParticipant.update({
    where: {
      conversation_id_user_id: {
        conversation_id: convId,
        user_id: user.id
      }
    },
    data: { last_read_at: new Date() }
  });

  return {
    id: message.id,
    conversationId: message.conversation_id,
    senderId: message.sender_id,
    senderName: message.sender?.full_name,
    senderRole: message.sender?.role,
    text: text, // Raw text to sender/broadcast payload
    attachments: message.attachments || [],
    isEncrypted: true,
    createdAt: message.created_at
  };
};

/**
 * Mark conversation as read
 */
const markAsRead = async (user, conversationId) => {
  const convId = Number(conversationId);

  await prisma.conversationParticipant.update({
    where: {
      conversation_id_user_id: {
        conversation_id: convId,
        user_id: user.id
      }
    },
    data: { last_read_at: new Date() }
  });

  return { success: true };
};

module.exports = {
  getContacts,
  listConversations,
  getOrCreatePrivateConversation,
  getMessages,
  sendMessage,
  markAsRead,
};
