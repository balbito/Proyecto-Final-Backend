import { Router } from "express";
import {
  getCartsController,
  getCartController,
  postCartController,
  postProductInCartController,
  putProductsInCartController,
  putProductQuantityInCartController,
  deleteCartController,
  deleteProductFromCartController,
  purchaseController,
} from "../../controllers/cartsControllers.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const CartsRouter = Router();
const auxiliar = (req, res) => {
    console.log(purchaseController)
}
//Get carts
CartsRouter.get(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  getCartsController
);

//Get carts
CartsRouter.get(
  "/:cid",
  passportCall("jwt"),
  authorization(["user", "admin"]),
  getCartController
);

//Post cart
CartsRouter.post(
  "/:uid",
  passportCall("jwt"),
  authorization(["user", "admin"]),
  postCartController
);

//post product in cart
CartsRouter.post(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  postProductInCartController
);

//put products in cart
CartsRouter.put(
  "/:cid",
  passportCall("jwt"),
  authorization("admin"),
  putProductsInCartController
);

//put product quantity in  cart
CartsRouter.put(
  "/:cid/products/:pid",
  passportCall("jwt"),
  authorization("user"),
  putProductQuantityInCartController
);

//delete cart
CartsRouter.delete(
  "/:cid",
  passportCall("jwt"),
  authorization("admin"),
  deleteCartController
);

//delete product from cart
CartsRouter.delete(
  "/:cid/products/:pid",
  passportCall("jwt"),
  authorization("user"),
  deleteProductFromCartController
);

//confirm purchase
CartsRouter.post(
  "/compra",
  passportCall("jwt"),
  authorization("user"),
  auxiliar
);

export { CartsRouter };