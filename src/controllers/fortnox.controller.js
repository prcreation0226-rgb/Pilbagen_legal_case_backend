const fortnoxService = require('../services/fortnoxService');
const prisma = require('../config/db');
const { sendResponse } = require('../utils/response');

const getConfig = async (req, res, next) => {
  try {
    const config = await fortnoxService.getFortnoxConfig();
    res.status(200).json(sendResponse(true, 'Fortnox config fetched', config));
  } catch (err) {
    next(err);
  }
};

const updateConfig = async (req, res, next) => {
  try {
    const { enabled, apiKey, accessToken, clientSecret, costCenter } = req.body;
    let profile = await prisma.companyProfile.findFirst();
    if (!profile) {
      profile = await prisma.companyProfile.create({ data: {} });
    }

    const updated = await prisma.companyProfile.update({
      where: { id: profile.id },
      data: {
        fortnox_enabled: Boolean(enabled),
        fortnox_api_key: apiKey || null,
        fortnox_access_token: accessToken || null,
        fortnox_client_secret: clientSecret || null,
        fortnox_cost_center: costCenter || null,
      },
    });

    res.status(200).json(sendResponse(true, 'Fortnox configuration saved successfully', updated));
  } catch (err) {
    next(err);
  }
};

const testConnection = async (req, res, next) => {
  try {
    const result = await fortnoxService.testConnection(req.body);
    res.status(200).json(sendResponse(result.success, result.message, result));
  } catch (err) {
    next(err);
  }
};

const postInvoice = async (req, res, next) => {
  try {
    const invoice = await fortnoxService.postInvoiceToFortnox(req.params.id);
    res.status(200).json(sendResponse(true, `Invoice posted to Fortnox (${invoice.fortnox_id})`, invoice));
  } catch (err) {
    next(err);
  }
};

const syncInvoice = async (req, res, next) => {
  try {
    const invoice = await fortnoxService.syncInvoiceStatus(req.params.id);
    res.status(200).json(sendResponse(true, `Fortnox status synced (${invoice.fortnox_status})`, invoice));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getConfig,
  updateConfig,
  testConnection,
  postInvoice,
  syncInvoice,
};
