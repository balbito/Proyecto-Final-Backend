import logger  from "../utils/logger.js";
import config from "../config/config.js";
import { usersService } from "../services/service.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { sendResetPasswordEmail } from "../utils/email.js";
import { JWTVerified, generateResetPassword } from "../utils/passport.js";
import nodemailer from "nodemailer";


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

export const changeToPremiumController = async (req, res) => {
  try {
    const userId = req.params.uid
    const payload = await usersService.changeRole(userId)
    console.log(payload, "Soy payload")
    if(payload) {
      res.send("Se han actualiado los roles, porfavor vuelva a loguearse")
      return 
    }
  } catch (error) {
    res.status(400).send("Se ha producido un error, vuelva  intentarlo")
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
    console.log(token)
    await sendResetPasswordEmail(email, token)
    res.status(200).send("Se envio el email")
  } catch (error) {
    logger.error("Se ha producido un error al mandar el email" + error)
  }
}

export const changePassword = async (req, res) => {
  console.log("entre a changePassword")
  try {
    const { password, confirmPassword, token } = req.body;
    console.log(req.body)
    const user = JWTVerified(token, config.privateKey)
    console.log(user)
    const userRef = await usersService.getUserByEmail(user.user.email)
    console.log(userRef)
    if(password !== confirmPassword){
      return res.status(202).send("Las contraseñas no coinciden")
    }
    if(isValidPassword(userRef, password)){
      return res.status(202).send("No puedes usar la misma contraseña")
    }
    const passwordHashed = createHash(password)
    console.log(userRef.password)
    console.log(userRef)
    userRef.password = passwordHashed
    userRef.save()
    res.status(200).send("Se cambio la contraseña del usuario, vuelva a loguearse")

  } catch (error) {
    logger.error("No se pudo cambiar contraseña" + error)
  }
}