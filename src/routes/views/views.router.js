import { Router } from "express";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";
import { cartService, productsService, ticketsService, usersService } from "../../services/service.js";

const router = Router();

//Basic redirection
viewsRouter.get("/", (req, res) => {
  res.redirect("/users/register");
});

//Chat
viewsRouter.get(
  "/chat",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.render("chat", {
      title: "Chat",
      user: req.user,
    });
  }
);

//Products
viewsRouter.get(
  "/products",
  passportCall("jwt"),
  authorization(["admin", "user"]),
  async (req, res) => {
    const { page, limit, sort } = req.query;
    const products = await productsService.getAll(limit, page, sort);
    res.render("products", {
      title: "Products",
      products,
      user: req.user,
    });
  }
);

//Purchase successfull
viewsRouter.get(
  "/successPurchase",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.render("success", {
      title: "Success Purchase",
      user: req.user,
    });
  }
);

//Product Manager
viewsRouter.get(
  "/productmanager",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const products = await productsService.getAll();
    res.render("productManager", {
      title: "Products Mongoose",
      products,
      user: req.user,
    });
  }
);

//Cart Manager
viewsRouter.get(
  "/cartmanager",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const carts = await cartService.getAll();
    res.render("cartManager", {
      title: "Carts Mongoose",
      carts,
    });
  }
);

//Users Manager
viewsRouter.get(
  "/usermanager",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const users = await usersService.getAll();
    res.render("userManager", {
      title: "Users Mongoose",
      users,
    });
  }
);

//Tickets Manager
viewsRouter.get(
  "/ticketmanager",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const tickets = await ticketsService.getAll();
    res.render("ticketManager", {
      title: "Ticket Mongoose",
      tickets,
    });
  }
);

export default router;