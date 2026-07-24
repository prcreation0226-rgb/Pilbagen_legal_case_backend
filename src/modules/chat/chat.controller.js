const chatService = require('./chat.service');
const { sendResponse } = require('../../utils/response');

const getContacts = async (req, res, next) => {
  try {
    const data = await chatService.getContacts(req.user);
    res.status(200).json(sendResponse(true, 'Contacts retrieved', data));
  } catch (err) {
    next(err);
  }
};

const listConversations = async (req, res, next) => {
  try {
    const data = await chatService.listConversations(req.user);
    res.status(200).json(sendResponse(true, 'Conversations retrieved', data));
  } catch (err) {
    next(err);
  }
};

const startPrivateConversation = async (req, res, next) => {
  try {
    const { targetUserId } = req.body;
    const data = await chatService.getOrCreatePrivateConversation(req.user, targetUserId);
    res.status(200).json(sendResponse(true, 'Conversation ready', data));
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { limit, page } = req.query;
    const data = await chatService.getMessages(req.user, conversationId, { limit, page });
    res.status(200).json(sendResponse(true, 'Messages retrieved', data));
  } catch (err) {
    next(err);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { text, attachments } = req.body;
    const data = await chatService.sendMessage(req.user, { conversationId, text, attachments });
    res.status(201).json(sendResponse(true, 'Message sent', data));
  } catch (err) {
    next(err);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const data = await chatService.markAsRead(req.user, conversationId);
    res.status(200).json(sendResponse(true, 'Conversation marked read', data));
  } catch (err) {
    next(err);
  }
};

const uploadAttachment = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(sendResponse(false, 'No file uploaded'));
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json(sendResponse(true, 'File uploaded', {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl
    }));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContacts,
  listConversations,
  startPrivateConversation,
  getMessages,
  sendMessage,
  markAsRead,
  uploadAttachment,
};
