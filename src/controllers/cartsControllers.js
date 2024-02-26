import { cartService } from "../services/service.js";
import userModel from "../models/users.model.js";
import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "../utils/utils.js";
import ticketModel from "../models/ticket.model.js";
  
//Transport config
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword,
  },
});

export const getCartsController = async (req, res) => {
  try {
    let carts = await cartService.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    let cart = await cartService.getOne(cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postCartController = async (req, res) => {
  try {
    let uid = req.params.uid;
    let cart = await cartService.create(uid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postProductInCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let cart = await cartService.addProduct(cid, pid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putProductsInCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    let products = req.body;
    let cart = await cartService.updateCart(cid, products);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putProductQuantityInCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body.quantity;
    let cart = await cartService.updateProductQuantity(cid, pid, quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let cart = await cartService.deleteProduct(cid, pid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    let cid = req.params.cid;
    await cartService.delete(cid);
    res.json({ message: "cart deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const purchaseController = async (req, res) => {
  try {
    let cid = req.params.cid;
    let cart = await cartService.purchase(cid);
    const user = await userModel.findById(cart.userId);
    let ticket = await ticketModel.findOne({ purchaser: user.email });

    await sendEmailWithTicket(user.email, ticket);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmailWithTicket = async (email, ticket) => {
  try {
    const mailOptions = {
      from: "Ecommerce - " + config.gmailAccount,
      to: email,
      subject: "Order Confirmation",
      html: `<div>
                <h1>Your Order Details</h1>
                <p>Order ID: ${ticket._id}</p>
                <p>Total Amount: ${ticket.amount}</p>
                <p>Purchased Products:</p>
                <ul>
                  ${ticket.products
                    .map(
                      (product) =>
                        `<li>ProductId: ${product.productId}, Quantity:${product.quantity}</li>`
                    )
                    .join("")}
                </ul>
            </div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent to: " + email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email: " + error.message);
  }
};