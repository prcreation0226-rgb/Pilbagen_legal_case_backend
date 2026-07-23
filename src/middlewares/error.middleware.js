const { sendResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  if (!err.statusCode || err.statusCode >= 500) {
    console.error(err.stack || err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(sendResponse(false, message));
};

module.exports = {
  errorHandler,
};
