import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/users.model.js";

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

  async purchase(id) {
    try {
      let cart = await cartModel.findById(id);
      if (!cart) {
        throw new Error("Cart not found");
      }

      let purchasedProducts = [];
      let notPurchasedProducts = [];
      let total = 0;

      for (const cartProduct of cart.products) {
        const productId = cartProduct.productId._id;
        const product = await productModel.findById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        if (product.stock >= cartProduct.quantity) {
          product.stock -= cartProduct.quantity;
          total += product.price * cartProduct.quantity;
          await product.save();
          purchasedProducts.push({
            productId: productId,
            quantity: cartProduct.quantity,
          });
        } else {
          notPurchasedProducts.push({
            productId: productId,
            quantity: cartProduct.quantity,
          });
        }
      }

      cart.products = cart.products.filter((cartProduct) => {
        return !purchasedProducts.some((purchasedProduct) => {
          return purchasedProduct.productId.equals(cartProduct.productId._id);
        });
      });

      await cart.save();

      const user = await userModel.findById(cart.userId);
      let ticket = {
        code: ticket.code,
        purchase_dateTime: new Date().toString(),
        amount: total,
        purchaser: user.email,
        products: purchasedProducts,
      };

      if (purchasedProducts.length > 0) {
        await ticketModel.create(ticket);
      }

      return cart;
    } catch (error) {
      throw new Error("Error purchasing: " + error.message);
    }
  }
}