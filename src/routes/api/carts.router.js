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
  validateProductsController,
} from "../../controllers/cartsControllers.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const CartsRouter = Router();
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
  authorization(["user", "premium", "admin"]),
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
  "/product/:pid",
  passportCall("jwt"),
  authorization(["user", "admin", "premium"]),
  postProductInCartController
);

//put products in cart
CartsRouter.put(
  "/:cid",
  passportCall("jwt"),
  authorization(["user", "admin", "premium"]),
  putProductsInCartController
);

//put product quantity in  cart
CartsRouter.put(
  "/products/:pid",
  passportCall("jwt"),
  authorization(["user", "premium", "admin"]),
  putProductQuantityInCartController
);

//delete cart
CartsRouter.delete(
  "/:cid",
  passportCall("jwt"),
  authorization(["admin"]),
  deleteCartController
);

//delete product from cart
CartsRouter.delete(
  "/:cid/products/:pid",
  passportCall("jwt"),
  authorization(["user", "premium", "admin"]),
  deleteProductFromCartController
);

//confirm purchase
CartsRouter.get(
  "/ticket/purchase",
  passportCall("jwt"),
  authorization(["user", "premium", "admin"]),
  purchaseController
);

CartsRouter.get("/validateProducts/checkout",
passportCall("jwt"),
authorization(["user", "premium", "admin"]),
validateProductsController
)
export { CartsRouter };