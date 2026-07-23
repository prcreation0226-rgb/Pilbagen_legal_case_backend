const superAdminService = require('./super-admin.service');
const { sendResponse } = require('../../utils/response');
const usersService = require('../users/users.service');

/**
 * Super Admin Dashboard
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const data = await superAdminService.getDashboard();
    res.json(sendResponse(true, 'Dashboard KPIs loaded', data));
  } catch (err) {
    next(err);
  }
};

/**
 * Agencies CRUD
 */
exports.listAgencies = async (req, res, next) => {
  try {
    const filters = {
      q: req.query.q,
      status: req.query.status,
      page: req.query.page || 1,
      limit: req.query.limit || 50,
      sortBy: req.query.sortBy || 'created_at',
      sortOrder: req.query.sortOrder || 'desc'
    };
    const result = await superAdminService.listAgencies(filters);
    res.json(sendResponse(true, 'Agencies listed successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.createAgency = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.name || !data.owner || !data.email) {
      return res.status(400).json(sendResponse(false, 'Missing required agency details (name, owner, email)'));
    }
    const result = await superAdminService.createAgency(req.user.id, data);
    res.status(201).json(sendResponse(true, 'Agency created successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.updateAgency = async (req, res, next) => {
  try {
    const result = await superAdminService.updateAgency(req.user.id, req.params.id, req.body);
    res.json(sendResponse(true, 'Agency updated successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.deleteAgency = async (req, res, next) => {
  try {
    const result = await superAdminService.deleteAgency(req.user.id, req.params.id);
    res.json(sendResponse(true, 'Agency deactivated successfully', result));
  } catch (err) {
    res.status(400).json(sendResponse(false, err.message));
  }
};

/**
 * Offices CRUD
 */
exports.listOffices = async (req, res, next) => {
  try {
    const filters = {
      q: req.query.q,
      status: req.query.status,
      page: req.query.page || 1,
      limit: req.query.limit || 50,
      sortBy: req.query.sortBy || 'created_at',
      sortOrder: req.query.sortOrder || 'desc'
    };
    const result = await superAdminService.listOffices(filters);
    res.json(sendResponse(true, 'Offices listed successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.createOffice = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.name || !data.city || (!data.agency_id && !data.agencyId)) {
      return res.status(400).json(sendResponse(false, 'Missing required office details (name, city, agency_id)'));
    }
    const result = await superAdminService.createOffice(req.user.id, data);
    res.status(201).json(sendResponse(true, 'Office created successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.updateOffice = async (req, res, next) => {
  try {
    const result = await superAdminService.updateOffice(req.user.id, req.params.id, req.body);
    res.json(sendResponse(true, 'Office updated successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.deleteOffice = async (req, res, next) => {
  try {
    const result = await superAdminService.deleteOffice(req.user.id, req.params.id);
    res.json(sendResponse(true, 'Office deactivated successfully', result));
  } catch (err) {
    next(err);
  }
};

/**
 * Users CRUD (Platform-wide)
 */
exports.listUsers = async (req, res, next) => {
  try {
    const filters = {
      q: req.query.q,
      role: req.query.role,
      status: req.query.status,
      page: req.query.page || 1,
      limit: req.query.limit || 50,
      sortBy: req.query.sortBy || 'created_at',
      sortOrder: req.query.sortOrder || 'desc'
    };
    const result = await superAdminService.listUsers(filters);
    res.json(sendResponse(true, 'Users listed successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.name || !data.email || !data.role) {
      return res.status(400).json(sendResponse(false, 'Missing required user parameters (name, email, role)'));
    }
    const result = await superAdminService.createUser(req.user.id, data);
    res.status(201).json(sendResponse(true, 'User registered successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const result = await superAdminService.updateUser(req.user.id, req.params.id, req.body);
    res.json(sendResponse(true, 'User updated successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await superAdminService.deleteUser(req.user.id, req.params.id);
    res.json(sendResponse(true, 'User deactivated successfully', result));
  } catch (err) {
    next(err);
  }
};

exports.resetUserPassword = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json(sendResponse(false, 'Missing newPassword parameter'));
    }
    // Reuse existing usersService.resetPassword directly
    await usersService.resetPassword(userId, newPassword);
    res.json(sendResponse(true, 'User password reset successfully'));
  } catch (err) {
    next(err);
  }
};

/**
 * Activity Logs List
 */
exports.listActivityLogs = async (req, res, next) => {
  try {
    const filters = {
      page: req.query.page || 1,
      limit: req.query.limit || 50,
      severity: req.query.severity || 'all'
    };
    const result = await superAdminService.listActivityLogs(filters);
    res.json(sendResponse(true, 'Activity logs fetched successfully', result));
  } catch (err) {
    next(err);
  }
};

/**
 * Settings CRUD
 */
exports.getSettings = async (req, res, next) => {
  try {
    const data = await superAdminService.getSettings();
    res.json(sendResponse(true, 'Super Admin settings fetched', data));
  } catch (err) {
    next(err);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    await superAdminService.updateSettings(req.user.id, req.body);
    res.json(sendResponse(true, 'Super Admin settings updated successfully'));
  } catch (err) {
    next(err);
  }
};
