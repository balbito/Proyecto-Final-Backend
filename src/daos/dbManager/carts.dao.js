import { cartModel } from "../../models/carts.model.js";
import { productModel } from "../../models/products.model.js";

class CartDao {
    async getAllCarts() {
        return await cartModel.find();
    }

    async createCart() {
        return await cartModel.create({})
    }

    async getCartById(id) {
        const cart = await cartModel.findById(id);
        if (!cart) {
            throw new Error("carrito no encontrado")
        } else {
            return cart;
        }
    }

    async addProductCart(cartId, productId) {
        //Obtengo el carrito por su ID
        const cart = await cartModel.findById(cartId);
        // console.log("cart:", cart);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        // Obtengo el producto por ID
        const product = await productModel.findById(productId);
        // console.log("product:", product);
        if(!product) {
            throw new Error ("Producto no encontrado");
        }

        // Verifico si el producto ya esta en el carrito
        const producExist = cart.products.find((p) => p.productId.equals(productId));
    

        // Actualizo la cantidad del producto en el carrito
        if(producExist) {
            producExist.quantity++;
        } else {
            // Si el producto no esta en el carrito lo agrego con una cantidad inicial de 1
            const newProduct = { productId: product._id, quantity:1};

            cart.products.push(newProduct);
        }

        // Guardo y deuelvo el carrito actualizado
        return await cart.save();
     }

     async deleteProductCart(cartId, productId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
          throw new Error("Cart not found");
        }
        const product = await productModel.findById(productId);
        if (!product) {
          throw new Error("Product not found");
        }
        const productIndex = cart.products.findIndex(
          (p) => p.productId.toString() === productId
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
        const existingProduct = cart.products.find((p) =>
          p.productId.equals(productId)
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
    
}
export default new CartDao();