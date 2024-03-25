import { Router } from "express";
import { authorization, tokenResetPassword } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";
import { cartService, productsService, ticketsService, usersService } from "../../services/service.js";
import userDTO from "../../services/dto/user.dto.js";

const viewsRouter = Router();

//Basic redirection
viewsRouter.get("/", (req, res) => {
  res.redirect("/register");
});

//ADMIN VIEWS

//Manager
viewsRouter.get(
  "/manager",
  passportCall("jwt"),
  authorization("admin"),
  (req, res) => {
    res.render("manager", {
      title: "Admin Manager",
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
  authorization("user"),
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

//USERS

//---REGISTER LOGIN

//Local register
viewsRouter.get("/register", (req, res) => {
  res.render("register");
});

//Local login
viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

//Github login
viewsRouter.get("/github/login", (req, res) => {
  res.render("github-login");
});

//Github error
viewsRouter.get("/github/error", (req, res) => {
  res.render("error", { error: "Unable to log in using GitHub!" });
});

//---PROFILE
viewsRouter.get(
  "/current",
  passportCall("jwt"),
  authorization(["user", "admin"]),
  (req, res) => {
    let user = new userDTO(req.user);
    res.render("profile", {
      user: user,
    });
  }
);

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
  authorization(["admin", "user", "premium"]),
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

viewsRouter.get("/recoverPassword",
async (req, res) => {
  res.render("password")
})

viewsRouter.get("/changePassword",
tokenResetPassword,
async (req, res) => {
  res.render("passwordchangeform")
})
export { viewsRouter };