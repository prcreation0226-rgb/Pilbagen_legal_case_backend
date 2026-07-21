const express = require('express');
const router = express.Router();
const controller = require('../controllers/fortnox.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/config', controller.getConfig);
router.post('/config', controller.updateConfig);
router.post('/test', controller.testConnection);
router.post('/invoices/:id/post', controller.postInvoice);
router.post('/invoices/:id/sync', controller.syncInvoice);

module.exports = router;
