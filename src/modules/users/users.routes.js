const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.use(protect);

router.get('/', authorize('admin', 'lawyer', 'partner'), usersController.getAll);
router.get('/:id', authorize('admin', 'lawyer', 'partner'), usersController.getById);
router.post('/', authorize('admin', 'partner'), usersController.create);
router.put('/:id', authorize('admin', 'partner'), usersController.update);
router.patch('/:id/reset-password', authorize('admin', 'partner'), usersController.resetPassword);
router.delete('/:id', authorize('admin', 'partner'), usersController.remove);

module.exports = router;
