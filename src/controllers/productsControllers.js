import { productsService } from "../services/service.js";
import CustomError from "../services/errors/CustomError.js";
import { generateProductErrorInfo } from "../services/errors/messages/product-creation-error.message.js";
import { generateProducts } from "../utils/fakeProducts.js";
import logger from "../utils/logger.js";

export const generateMockProductsController = async (req, res) => {
  try {
    let products = generateProducts();
    res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsController = async (req, res) => {
  const { limit, page, sort } = req.query;
  try {
    let products = await productsService.getAll(limit, page, sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductController = async (req, res) => {
  try {
    let pid = req.params.pid;
    let product = await productsService.getOne(pid);
    if (!product) {
      return res.status(404).send("No product found");
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postProductController = async (req, res) => {
  const reqProduct = req.body;
  try {
    if (
      reqProduct.title === undefined ||
      reqProduct.description === undefined ||
      reqProduct.code === undefined ||
      reqProduct.price === undefined ||
      reqProduct.stock === undefined ||
      reqProduct.category === undefined ||
      reqProduct.thumbnails === undefined
    ) {
      CustomError.createError({
        name: "Product creation error",
        cause: generateProductErrorInfo(reqProduct),
        message: "Invalid property error",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    await productsService.create(reqProduct);
    res.json(reqProduct);
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      error: error.name,
      message: error.message,
      code: error.code,
    });
  }
};

export const putProductController = async (req, res) => {
  const pid = req.params.pid;
  const product = req.body;
  try {
    await productsService.update(pid, product);
    if (!product) return res.status(404).send("No product found");
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  const pid = req.params.pid;
  try {
    let product = await productsService.getOne(pid);
    if (!product) return res.status(404).send("No product found");
    await productsService.delete(pid);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};