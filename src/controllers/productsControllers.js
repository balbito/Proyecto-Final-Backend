import { productsService } from "../services/service.js";
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
  const {title, description, code, price, stock, category, thumbnails} = req.body;
  try {
    let email = req.user.email;
    console.log(email)
    const newProduct = { title, description, code, price, stock, category, thumbnails, owner: email }
    await productsService.create(newProduct);
    res.json(newProduct);
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
    const productToModified = await productsService.getOne(pid)
    if(req.user.role !== "admin") {
      if(productToModified.owner !== req.user.email){
        throw  new Error ("No estas autorizado para modificar el producto") 
      }
       
    }
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