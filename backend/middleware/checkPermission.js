const checkPermission = (permissionName) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roleId) {
      return res.status(403).json({ message: "No role assigned" });
    }

    const permissions = req.user.roleId.permissions.map(
      (p) => p.name
    );

    if (!permissions.includes(permissionName)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};

export default checkPermission;