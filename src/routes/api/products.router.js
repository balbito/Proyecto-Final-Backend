import { Router } from 'express';
import {
    getProductsController,
    getProductController,
    postProductController,
    putProductController,
    deleteProductController,
} from "../../controllers/productsControllers.js";

const router = Router();

//Get products
ProductRouter.get(
    "/",
    passportCall("jwt"),
    authorization("admin"),
    getProductsController
  );
  
  //Get product
  ProductRouter.get(
    "/:pid",
    passportCall("jwt"),
    authorization("admin"),
    getProductController
  );
  
  //Post product
  ProductRouter.post(
    "/",
    passportCall("jwt"),
    authorization("admin"),
    postProductController
  );
  
  //Put product
  ProductRouter.put(
    "/:pid",
    passportCall("jwt"),
    authorization("admin"),
    putProductController
  );
  
  //Delete product
  ProductRouter.delete(
    "/:pid",
    passportCall("jwt"),
    authorization("admin"),
    deleteProductController
  );


export default router;