// Authorization
export const authorization = (role) => {
    return async (req, res, next) => {
      if (!req.user)
        return res.status(401).send("Unauthorized: User not found in JWT");
      if (!role.includes(req.user.role)) {
        return res.status(403).send("Forbidden: No permises with provided rol.");
      }
      next();
    };
  };