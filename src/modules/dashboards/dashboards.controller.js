const service = require('./dashboards.service');
const { sendResponse } = require('../../utils/response');

const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await service.getAdminDashboard(req.agency_id);
    res.status(200).json(sendResponse(true, 'Admin dashboard fetched', data));
  } catch (err) {
    next(err);
  }
};

const getLawyerDashboard = async (req, res, next) => {
  try {
    const data = await service.getLawyerStats(req.user.id);
    res.status(200).json(sendResponse(true, 'Lawyer dashboard fetched', data));
  } catch (err) {
    next(err);
  }
};

const getClientDashboard = async (req, res, next) => {
  try {
    const data = await service.getClientStats(req.user.id);
    res.status(200).json(sendResponse(true, 'Client dashboard fetched', data));
  } catch (err) {
    next(err);
  }
};

/** @deprecated Prefer GET /dashboard/admin|lawyer|client */
const getStats = async (req, res, next) => {
  try {
    let data;
    const { role, id } = req.user;

    if (role === 'admin') {
      data = await service.getAdminDashboard(req.agency_id);
    } else if (role === 'lawyer') {
      data = await service.getLawyerStats(id);
    } else if (role === 'client') {
      data = await service.getClientStats(id);
    }

    res.status(200).json(sendResponse(true, 'Dashboard stats fetched', data));
  } catch (err) {
    next(err);
  }
};

const getPartnerDashboard = async (req, res, next) => {
  try {
    const data = await service.getPartnerDashboard(req.agency_id);
    res.status(200).json(sendResponse(true, 'Partner dashboard fetched', data));
  } catch (err) {
    next(err);
  }
};

const getParalegalDashboard = async (req, res, next) => {
  try {
    const data = await service.getParalegalDashboard(req.user.id, req.agency_id);
    res.status(200).json(sendResponse(true, 'Paralegal dashboard fetched', data));
  } catch (err) {
    next(err);
  }
};

const getBackOffice = async (req, res, next) => {
  try {
    const data = await service.getBackOfficeData(req.agency_id);
    res.status(200).json(sendResponse(true, 'Back Office data fetched', data));
  } catch (err) {
    next(err);
  }
};

const addBackOfficeVendor = async (req, res, next) => {
  try {
    const data = await service.addBackOfficeVendor(req.agency_id, req.body);
    res.status(201).json(sendResponse(true, 'Vendor contract added successfully', data));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminDashboard,
  getLawyerDashboard,
  getClientDashboard,
  getStats,
  getPartnerDashboard,
  getParalegalDashboard,
  getBackOffice,
  addBackOfficeVendor,
};
