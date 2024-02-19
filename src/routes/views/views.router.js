import { Router } from "express";
import productsDao from "../../daos/dbManager/products.dao.js";
import cartsDao from "../../daos/dbManager/carts.dao.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const router = Router();


router.get("/", (req, res) => {
  res.redirect("/users/register");
});



router.get(
  "/realtimeproducts",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const products = await productsDao.getAllProducts();
    res.render("realTimeProducts", {
      title: "Products Mongoose",
      products,
      user: req.user,
    });
  }
);

router.get("/chat", (req, res) => {
    res.render("chat", {
        title: "chat"
    });
});

router.get(
  "/products",
  passportCall("jwt"),
  authorization(["admin", "user"]),
  async (req, res) => {
    const { page, limit, sort } = req.query;
    const products = await productsDao.getAllProducts(page, limit, sort);
    res.render("products", {
      title: "Products",
      products,
      user: req.user,
    });
  }
);

router.get("/carts/", async (req, res) => {
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