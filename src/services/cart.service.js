import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/users.model.js";
import logger from "../utils/logger.js";

export default class CartService {
  async getAllCarts() {
    return await cartModel.find();
  }

  async getCartById(id) {
    let cart = await cartModel.findById(id);
    if (!cart) {
      throw new Error("Cart not found");
    } else {
      return cart;
    }
  }

  async createCart(userId) {
    return await cartModel.create({ userId: userId });
  }

  async addProductCart(cartId, productId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const existingProduct = cart.products.find((product) =>
      product.productId.equals(productId)
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ productId: productId, quantity: 1 });
    }
    return await cart.save();
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const productIndex = cart.products.findIndex(
      (product) => product.products._id.toString() === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found in the cart");
    }
    cart.products.splice(productIndex, 1);
    await cart.save();
    return cart;
  }

  async updateCart(cartId, newProducts) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    cart.products = newProducts;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const existingProduct = cart.products.find((product) =>
      product.products.equals(productId)
    );
    if (existingProduct) {
      existingProduct.quantity = quantity;
    } else {
      throw new Error("Product not found on cart");
    }
    return await cart.save();
  }

  async deleteCart(id) {
    let cart = await cartModel.findByIdAndDelete(id);
    if (!cart) {
      throw new Error("Cart not found");
    }
  }

  async purchase(cid, user) {
      const ticketPrueba = {}
      console.log("entre al purchase")
      const cart = await cartModel.findById(cid)
      console.log(cart)
      const ticket = {
        purchase_dateTime: "18/9/2000",
        amount: 0,
        purchaser: user.email,
        products: cart.products,
      }
      console.log(ticket)
      const newTicket = await ticketModel.create(ticketPrueba)
      console.log(newTicket);
      return newTicket;
    
  }
}