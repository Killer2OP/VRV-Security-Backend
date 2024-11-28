const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
      try {
        const user = req.user;
        
        const hasPermission = user.roles.some(role => 
          role.permissions.some(permission =>
            permission.resource === requiredPermission.resource &&
            permission.actions.includes(requiredPermission.action)
          )
        );
  
        if (!hasPermission) {
          throw new Error('Permission denied');
        }
  
        next();
      } catch (error) {
        res.status(403).json({ error: 'Access denied' });
      }
    };
  };
  
  module.exports = { checkPermission };