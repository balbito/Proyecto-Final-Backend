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
router.get("/", getProductsController);

//Get product
router.get("/:pid", getProductController);

//Post product
router.post("/", postProductController);

//Put product
router.put("/:pid", putProductController);

//Delete product
router.delete("/:pid", deleteProductController);


export default router;