const ac = require('../../../../common/accesscontrol/roles');

// Fixed middleware to correctly parse action and resource
exports.checkAccess = (role, action, resource) => {
  return (req, res, next) => {
    // Ensure we're getting the role from the request
    const userRole = req.user.role; // This assumes req.user.role is correctly set
    const permission = ac.can(userRole)[action](resource);

    if (permission.granted) {
      next();
    } else {
      return res.status(403).json({ message: 'Access Denied' });
    }
  };
};
