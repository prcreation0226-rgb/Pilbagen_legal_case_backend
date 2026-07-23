const express = require('express');
const router = express.Router();
const superAdminController = require('./super-admin.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

// Protect all Super Admin endpoints
router.use(protect);
router.use(authorize('super_admin'));

// Dashboard KPIs
router.get('/dashboard', superAdminController.getDashboard);

// Agencies CRUD
router.get('/agencies', superAdminController.listAgencies);
router.post('/agencies', superAdminController.createAgency);
router.put('/agencies/:id', superAdminController.updateAgency);
router.delete('/agencies/:id', superAdminController.deleteAgency);

// Offices CRUD
router.get('/offices', superAdminController.listOffices);
router.post('/offices', superAdminController.createOffice);
router.put('/offices/:id', superAdminController.updateOffice);
router.delete('/offices/:id', superAdminController.deleteOffice);

// Users CRUD (platform-wide)
router.get('/users', superAdminController.listUsers);
router.post('/users', superAdminController.createUser);
router.put('/users/:id', superAdminController.updateUser);
router.delete('/users/:id', superAdminController.deleteUser);
router.patch('/users/:id/reset-password', superAdminController.resetUserPassword);

// Activity Logs List
router.get('/activity-logs', superAdminController.listActivityLogs);

// Settings CRUD
router.get('/settings', superAdminController.getSettings);
router.put('/settings', superAdminController.updateSettings);

module.exports = router;
