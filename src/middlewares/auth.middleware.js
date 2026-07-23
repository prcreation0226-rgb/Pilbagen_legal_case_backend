const { verifyToken } = require('../utils/jwt');
const { sendResponse } = require('../utils/response');
const prisma = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json(sendResponse(false, 'Not authorized to access this route'));
  }

  try {
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json(sendResponse(false, 'Not authorized to access this route'));
    }

    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        full_name: true,
        email: true,
        role: true,
        agency_id: true,
        is_active: true,
        roles: true,
        agency: { select: { id: true, name: true, owner: true, plan: true } }
      }
    });

    if (!req.user || !req.user.is_active) {
      return res.status(401).json(sendResponse(false, 'User not found or inactive'));
    }

    // Attach mapped roles or fallback
    req.user.roles = req.user.roles?.length > 0 ? req.user.roles.map(r => r.role) : [req.user.role];

    // Section 20.3 Multi-Tenant Server-Side Query Isolation Context
    const headerAgencyId = req.headers['x-agency-id'] || req.headers['x-tenant-id'];
    const agencyId = req.user.agency_id 
      ? parseInt(req.user.agency_id, 10) 
      : (headerAgencyId ? parseInt(headerAgencyId, 10) : 1);

    req.agency_id = Number.isFinite(agencyId) && agencyId > 0 ? agencyId : 1;
    req.withTenant = (whereClause = {}) => ({
      ...whereClause,
      agency_id: req.agency_id,
    });

    next();
  } catch (err) {
    return res.status(401).json(sendResponse(false, 'Not authorized to access this route'));
  }
};

module.exports = { protect };
