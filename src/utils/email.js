import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "../utils/utils.js";
import { productModel } from "../models/products.model.js";
import logger from "../utils/logger.js";

//Transport config
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: config.gmailAccount,
      pass: config.gmailAppPassword,
    },
  });


export async function sendResetPasswordEmail(email, token) {
  const mailOptions = {
    from: config.gmailAccount,
    to: email,
    subject: "Cambio de contraseña",
    html: `
    <div>
    <h1>Recupera tu contraseña</h1>
    <p> Si no fuiste vos comunicarse con soporte </p>
    <p>Para recuperar la contraseña hace click en el link debajo</p>
    <a href="http://localhost:8080/changePassword?token=${token}">Recuperar contraseña</a>
  </div>
  `
  }

  await transporter.sendMail(mailOptions)
}

export async function emailProductDelete(email) {
  const mailOptions = {
    from: config.gmailAccount,
    to: email,
    subject: "Producto Removido",
    html: `
    <div>
    <h1>Aviso de producto removido</h1>
    <h3>Hola ${user.first_name}! </h3>
    <p> Si no fuiste vos comunicarse con soporte </p>
  </div>
  `
  }

  await transporter.sendMail(mailOptions)
}

