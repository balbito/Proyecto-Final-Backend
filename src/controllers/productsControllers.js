import { productsService } from "../services/service.js";

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
  const product = req.body;
  try {
    await productsService.create(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
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