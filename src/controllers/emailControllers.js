import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "../utils/utils.js";

//Transport config
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword,
  },
});

//Gmail connection verification
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const mailOptions = {
  from: "Ecommerce - " + config.gmailAccount,
  to: `${config.gmailAccount}`,
  subject: "Order confirmation",
  html: `<div>
            <h1> Order confirmed </h1>
        </div>`,
  attachments: [],
};

const mailOptionsWithAttachments = {
  from: "Ecommerce - " + config.gmailAccount,
  to: `${config.gmailAccount}`,
  subject: "Discount Boucher",
  html: `<div>
            <h1>Here is your Gift boucher</h1>
            <img src="cid:boucher"/>
        </div>`,
  attachments: [
    {
      filename: "Discount boucher",
      path: __dirname + "/public/images/boucher.webp",
      cid: "boucher",
    },
  ],
};

export const sendEmail = (req, res) => {
  try {
    let result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).send({ message: "Error", payload: error });
      }
      console.log("Message sent: %s", info.messageId);
      res.send({ message: "Success", payload: info });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "Unable to send email from: " + config.gmailAccount,
    });
  }
};

export const sendEmailWithAttachments = (req, res) => {
  try {
    let result = transporter.sendMail(
      mailOptionsWithAttachments,
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ message: "Error", payload: error });
        }
        console.log("Message sent: %s", info.messageId);
        res.send({ message: "Success", payload: info });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "Unable to send email from: " + config.gmailAccount,
    });
  }
};