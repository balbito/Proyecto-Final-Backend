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

  //Gmail connection verification
transporter.verify(function (error, success) {
    if (error) {
      logger.info(error);
    } else {
      logger.info("Server is ready to take our messages");
    }
  });
  
  export const sendEmailWithTicket = async (email, ticket) => {
    try {
      // Retrieve product details
      const productsDetails = await Promise.all(
        ticket.products.map(async (product) => {
          const productInfo = await productModel.findById(product.productId);
          return {
            title: productInfo.title,
            thumbnail: productInfo.thumbnails[0], // Assuming the first thumbnail is the one to be displayed
            quantity: product.quantity,
          };
        })
      );
  
      const productCards = productsDetails
        .map(
          (product) => `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
          <h3>${product.title}</h3>
          <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100px; height: auto;">
          <p>Quantity: ${product.quantity}</p>
        </div>
      `
        )
        .join("");
  
      const mailOptions = {
        from: "Ecommerce - " + config.gmailAccount,
        to: email,
        subject: "Order Confirmation",
        html: `<div>
                  <h1>Your Order Details</h1>
                  <p>Order ID: ${ticket._id}</p>
                  <p>Total Amount: ${ticket.amount}</p>
                  <p>Purchased Products:</p>
                  ${productCards}
              </div>
              <div>
              <p>Thanks for trusting us, hope to hear from you soon!</p>
              </div>
              `,
      };
  
      await transporter.sendMail(mailOptions);
      logger.info("Order confirmation email sent to: " + email);
    } catch (error) {
      logger.warn("Error sending email:", error);
      throw new Error("Error sending email: " + error.message);
    }
  };