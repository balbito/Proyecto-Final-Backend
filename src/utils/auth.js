
import config from "../config/config.js";
import jwt from "jsonwebtoken";

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

export const tokenResetPassword = (req, res, next) => {
  const token = req.query.token;
  if(!token) {
    return res.status(400).send("No auth token")
  }
 jwt.verify(token, config.privateKey, (error, credentials) => {
  if(error){
    return res.render("password")
  }
  req.user = credentials.user
  next();
 }) 
} 