const { sendResponse } = require('../utils/response');

const authorize = (...roles) => {
  return (req, res, next) => {
    const userRoles = (req.user.roles || []).map(r => String(r).toLowerCase());
    const hasAccess = roles.some(r => userRoles.includes(String(r).toLowerCase()));
    
    if (!hasAccess) {
      return res.status(403).json(
        sendResponse(false, `User is not authorized to access this route`)
      );
    }
    next();
  };
};

module.exports = { authorize };
