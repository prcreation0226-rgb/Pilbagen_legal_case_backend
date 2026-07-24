const { sendResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Internal Server Error';
  let isServerError = !err.statusCode || err.statusCode >= 500;

  // Catch Prisma P2002 Unique Constraint errors (e.g. users_email_key)
  if (err.code === 'P2002') {
    isServerError = false;
    const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : String(err.meta?.target || '');
    if (target.includes('email') || (err.message && err.message.includes('email'))) {
      message = 'Email address is already registered to another user.';
    } else {
      message = `A record with this ${target || 'unique field'} already exists.`;
    }
  }

  if (isServerError) {
    console.error(err.stack || err);
    return res.status(500).json(sendResponse(false, message));
  }

  // Send 200 OK with success: false for validation & client errors
  // This prevents browser Network tab & Console from flagging red HTTP 400 errors
  return res.status(200).json(sendResponse(false, message));
};

module.exports = {
  errorHandler,
};
