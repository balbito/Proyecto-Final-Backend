import { Router } from "express";
import userModel from "../../models/users.model.js";
import cartsDao from "../../daos/dbManager/carts.dao.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const router = Router();

router.post(
    "/:productId",
    passportCall("jwt"),
    authorization("user"),
    async (req, res) => {
      try {
        const productId = req.params.productId;
        const userId = req.user.id;
  
        let user = await userModel.findById(userId).populate("cart");
  
        if (!user) {
          throw new Error("User not found");
        }
  
        let cart;
        if (!user.cart) {
          cart = await cartsDao.createCart();
          user.cart = cart._id;
          await user.save();
        } else {
          cart = user.cart;
        }
  
        await cartsDao.addProductCart(cart._id, productId);
        cart = await cartsDao.getCartById(cart._id);
        res.render("cart", {
          title: "Cart",
          cart,
          user: req.user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  router.delete(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization("user"),
    async (req, res) => {
      try {
        const productId = req.params.pid;
        const cartId = req.params.cid;
  
        await cartsDao.deleteProductCart(cartId, productId);
        let cart = await cartsDao.getCartById(cartId);
        res.render("cart", {
          title: "Cart",
          cart,
          user: req.user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  router.put(
    "/:cid/products/:pid",
    passportCall("jwt"),
    authorization("user"),
    async (req, res) => {
      try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
  
        await cartsDao.updateProductQuantity(cid, pid, quantity);
        let cart = await cartsDao.getCartById(cid);
        res.render("cart", {
          title: "Cart",
          cart,
          user: req.user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  export default router;