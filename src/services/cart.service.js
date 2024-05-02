import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
import ticketModel from "../models/ticket.model.js";
import { emailPurchase } from "../utils/email.js";
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
      console.log("params", cid , user)
        const cart = await cartModel.findOne({ _id: cid }).populate("products.productId");
        if (!cart) {
            return "Carrito no encontrado";
        }
        if (cart.products.length === 0) {
            return "Carrito está vacío";
        }
        console.log("cart", cart)
        let totalPrice = 0;
        
        // Recorremos los productos del carrito y sumamos el precio total
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i].productId;
            const quantity = cart.products[i].quantity;
            
            // Verificamos si el producto está disponible
            if (product.stock === 0 || product.status === false) {
                await this.deleteProductFromCart(cid, product._id);
                return "Algunos productos no están disponibles y se han eliminado del carrito";
            }
            
            // Sumamos el precio total, teniendo en cuenta la cantidad de cada producto
            totalPrice += product.price * quantity;
        }
        
        // Creamos el ticket de compra
        const ticket = {
            purchase_dateTime: new Date(),
            amount: totalPrice,
            purchaser: user.email,
            products: cart.products
        };
        console.log("ticket", ticket)
        const newTicket = await ticketModel.create(ticket);
        await emailPurchase( user.email, ticket)
        // Actualizamos el stock de los productos y eliminamos todos los productos del carrito
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i].productId;
            const quantity = cart.products[i].quantity;
            
            product.stock -= quantity;
            await product.save();
        }
        await this.deleteAllProducts(cid);
        
        return newTicket;
    } catch (error) {
        logger.error("Error en el proceso de compra:", error);
        return "Error en el proceso de compra";
    }
}

async validateProducts (cid, user) {
  try {
    
    const cart = await cartModel.findOne({ _id: cid }).populate("products.productId");
          if (!cart) {
              return -1;
          }
          if (cart.products.length === 0) {
              return -1;
          }
          
          let totalPrice = 0;
          
          // Recorremos los productos del carrito y sumamos el precio total
          for (let i = 0; i < cart.products.length; i++) {
              const product = cart.products[i].productId;
              const quantity = cart.products[i].quantity;
              
              // Verificamos si el producto está disponible
              if (product.stock === 0 || product.status === false) {
                  await this.deleteProductFromCart(cid, product._id);
                  return -1;
              }
              
              // Sumamos el precio total, teniendo en cuenta la cantidad de cada producto
              totalPrice += product.price * quantity;
          }
          return totalPrice;
  } catch (error) {
    console.log(error)
  }
}
}

