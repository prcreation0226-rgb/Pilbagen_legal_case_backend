const express = require('express');
const router = express.Router();
const controller = require('./chat.controller');
const { protect } = require('../../middlewares/auth.middleware');
const upload = require('../../utils/upload');

// Reject Super Admin middleware
const rejectSuperAdmin = (req, res, next) => {
  const userRole = req.user?.role || (req.user?.roles && req.user.roles[0]);
  if (userRole === 'super_admin' || userRole === 'superadmin') {
    return res.status(403).json({ success: false, message: 'Super Admin does not have access to Chat module' });
  }
  next();
};

router.use(protect, rejectSuperAdmin);

router.get('/contacts', controller.getContacts);
router.get('/conversations', controller.listConversations);
router.post('/conversations/private', controller.startPrivateConversation);
router.get('/conversations/:conversationId/messages', controller.getMessages);
router.post('/conversations/:conversationId/messages', controller.sendMessage);
router.post('/conversations/:conversationId/read', controller.markAsRead);
router.post('/upload', upload.single('attachment'), controller.uploadAttachment);

module.exports = router;
