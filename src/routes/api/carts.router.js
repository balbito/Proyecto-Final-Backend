import { Router } from 'express';
import {
  getCartsController,
  getCartController,
  postCartController,
  postProductInCartController,
  putProductsInCartController,
  putProductQuantityInCartController,
  deleteCartController,
  deleteProductFromCartController,
} from "../../controllers/cartsControllers.js";

const router = Router();

router.get("/", getCartsController);

router.get("/:cid", getCartController);

router.post("/", postCartController);

router.post("/:cid/product/:pid", postProductInCartController);

router.put("/:cid", putProductsInCartController);

router.put("/:cid/products/:pid", putProductQuantityInCartController);

router.delete("/:cid", deleteCartController);

router.delete("/:cid/products/:pid", deleteProductFromCartController);

export default router;