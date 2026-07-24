const { sendResponse } = require('../../utils/response');
const leadsService = require('./leads.service');

const getAll = async (req, res, next) => {
  try {
    const data = await leadsService.getAll(req.query, req.user);
    res.status(200).json(sendResponse(true, 'Leads fetched successfully', data));
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await leadsService.getById(req.params.id, req.user);
    res.status(200).json(sendResponse(true, 'Lead fetched successfully', data));
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = await leadsService.create(req.body, req.user);
    res.status(201).json(sendResponse(true, 'Lead created successfully', data));
  } catch (err) {
    next(err);
  }
};

const createPublicConsultation = async (req, res, next) => {
  try {
    const agencyId = req.headers['x-agency-id'] || req.headers['x-tenant-id'] || req.body.agency_id || 1;
    req.body.agency_id = parseInt(agencyId, 10);
    const data = await leadsService.createFromPublicConsultation(req.body);
    res.status(201).json(sendResponse(true, 'Consultation request received', data));
  } catch (err) {
    next(err);
  }
};

const createPublicInquiry = async (req, res, next) => {
  try {
    const agencyId = req.headers['x-agency-id'] || req.headers['x-tenant-id'] || req.body.agency_id || 1;
    req.body.agency_id = parseInt(agencyId, 10);
    const data = await leadsService.createFromPublicInquiry(req.body);
    res.status(201).json(sendResponse(true, 'Inquiry received', data));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await leadsService.update(req.params.id, req.body, req.user);
    res.status(200).json(sendResponse(true, 'Lead updated successfully', data));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await leadsService.remove(req.params.id, req.user);
    res.status(200).json(sendResponse(true, 'Lead deleted successfully'));
  } catch (err) {
    next(err);
  }
};

const convertToClient = async (req, res, next) => {
  try {
    const client = await leadsService.convertToClient(req.params.id, req.user.id, req.user);
    res.status(200).json(sendResponse(true, 'Lead converted to client successfully', client));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  createPublicConsultation,
  createPublicInquiry,
  update,
  remove,
  convertToClient,
};

