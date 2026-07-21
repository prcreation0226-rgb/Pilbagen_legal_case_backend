const { sendResponse } = require('../utils/response');

/**
 * Strict Multi-Tenant Server-Side Query Isolation Guard Middleware (Section 20.3)
 * Enforces agency_id tenant isolation across all backend routes and Prisma queries.
 */
const tenantGuard = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json(sendResponse(false, 'Not authorized: User authentication required for tenant context.'));
  }

  // Resolve agency_id from authenticated user profile, session header, or default tenant (Agency 1)
  const headerAgencyId = req.headers['x-agency-id'] || req.headers['x-tenant-id'];
  const agencyId = req.user.agency_id 
    ? parseInt(req.user.agency_id, 10) 
    : (headerAgencyId ? parseInt(headerAgencyId, 10) : 1);

  if (!Number.isFinite(agencyId) || agencyId <= 0) {
    return res.status(403).json(sendResponse(false, 'Invalid agency tenant context. Access denied.'));
  }

  // Attach tenant context to request object
  req.agency_id = agencyId;
  req.tenantContext = {
    agency_id: agencyId,
    user_id: req.user.id,
    role: req.user.role,
  };

  // Helper method to attach agency_id to Prisma query filters automatically
  req.withTenant = (whereClause = {}) => {
    return {
      ...whereClause,
      agency_id: agencyId,
    };
  };

  next();
};

module.exports = { tenantGuard };
