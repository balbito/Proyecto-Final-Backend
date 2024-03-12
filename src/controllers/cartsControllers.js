import { cartService } from "../services/service.js";
import userModel from "../models/users.model.js";
import __dirname from "../utils/utils.js";
import ticketModel from "../models/ticket.model.js";
import { sendEmailWithTicket } from "../utils/email.js";
  

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
    console.log("entre al controller");
    let user = req.user;
    let cid = user.cart;
    let ticket = await cartService.purchase(cid, user);
    console.log("llame al purchase", ticket)
    req.logger.info(ticket)

    await sendEmailWithTicket(user.email, ticket);
    res.status(200).send("Compra realizada exitosamente:" + ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
