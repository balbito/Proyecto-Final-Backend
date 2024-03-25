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
      (product) => product.productId._id.toString() == productId
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
      product.productId.equals(productId)
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
  async deleteAllProducts(cid) {
    const cart = await cartModel.findById(cid)
    cart.products = [];
    cart.save();
    return true
  }
  async purchase(cid, user) {
    try {
      console.log("entre al purchase")
      const cart = await cartModel.findOne({_id: cid}).populate("products.productId")
      if (cart.products.length == 0) {
        return "carrito esta vacio"
      }
      // verificacion de productos disponibles
      for (let i = 0; i < cart.products.length; i++)  {
        if(cart.products[i].productId.stock == 0  || cart.products[i].productId.status == false) {
          this.deleteProductFromCart(cid, cart.products[i].productId._id)
          return "productos no disponible, se han removido del carrito"
        }
      }
      // recorremos para sumar el precio
      let totalPrice = 0
      for (let i = 0; i < cart.products.length; i++)  {
        console.log(cart.products[i].productId.price)
         totalPrice += cart.products[i].productId.price ;
      }
      // creando ticket
      const ticket = {
        purchase_dateTime: new Date(),
        amount: totalPrice,
        purchaser: user.email,
        products: cart.products,
      }
      const newTicket = await ticketModel.create(ticket)
      // Baja el stock
      for (let i = 0; i < cart.products.length; i++)  {

         cart.products[i].productId.stock = cart.products[i].productId.stock - cart.products[i].quantity;
         cart.products[i].productId.save();
         await productModel.findByIdAndUpdate(cart.products[i].productId._id, cart.products[i].productId)
         
      }
      
      
      this.deleteAllProducts(cid)
      return newTicket;      
    }
    catch (error) {
      console.log(error)
    }
  }
}