import logger  from "../utils/logger.js";
import config from "../config/config.js";
import { usersService } from "../services/service.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { sendResetPasswordEmail } from "../utils/email.js";
import { JWTVerified, generateResetPassword } from "../utils/passport.js";



export const getUsersController = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserController = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await usersService.getOne(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with ID: " + userId });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await usersService.delete(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with ID: " + userId });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.uid;
    const payload = await usersService.changeRole(userId, role)
    if(payload) {
      res.json({ message: "Roles updated, please log in again" });
      return;
    }
  } catch (error) {
    logger.error("Error changing user role:", error)
    res.status(400).json({ error: "An error occurred, please try again" });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersService.getUserByEmail(email);
    if(!user) {
      res.status(404).send("User not found with email"+ email)
    }
    const token = generateResetPassword(user);
    
    await sendResetPasswordEmail(email, token)
    res.status(200).send("Se envio el email")
  } catch (error) {
    logger.error("Se ha producido un error al mandar el email" + error)
  }
}

export const changePassword = async (req, res) => {
  
  try {
    const { password, confirmPassword, token } = req.body;
    
    const user = JWTVerified(token, config.privateKey)
    
    const userRef = await usersService.getUserByEmail(user.user.email)
    
    if(password !== confirmPassword){
      return res.status(202).send("Las contraseñas no coinciden")
    }
    if(isValidPassword(userRef, password)){
      return res.status(202).send("No puedes usar la misma contraseña")
    }
    const passwordHashed = createHash(password)
    userRef.password = passwordHashed
    userRef.save()
    res.status(200).send("Se cambio la contraseña del usuario, vuelva a loguearse")

  } catch (error) {
    logger.error("No se pudo cambiar contraseña" + error)
  }
}

export const deleteInactiveUsers = async (req, res) => {

  try {
    const deletedUsers = await usersService.deleteInactiveUsers();
    res.send("Se han eliminado:" + deletedUsers);
  } catch (error) {
    logger.error("Error de controller en deletelastconnection" + error)
  }
}