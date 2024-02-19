import { Router } from "express";
import productsDao from "../daos/dbManager/products.dao.js";
import cartsDao from "../daos/dbManager/carts.dao.js";

const router = Router();

router.get("/realTimeProducts", async (req, res) => {
  const products = await productsDao.getProducts();
  res.render("realTimeProducts", {
    products,
    title: "Mongoose Products"
  });
});

router.get("/chat", (req, res) => {
    res.render("chat", {
        title: "chat"
    });
});

router.get("/products", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  const products = await productsDao.getAllProducts(limit, page, query, sort);

  res.render("products", {
    title: "Products",
    products
  })
});

router.get("/carts", async (req, res) => {
  const carts = await cartsDao.getAllCarts();
  res.render("carts", {
    title: "Carts",
    carts,
  });
});


router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsDao.getCartById(cid);
  res.render("cart", {
    title: "Cart",
    cart,
  });
});
export default router;