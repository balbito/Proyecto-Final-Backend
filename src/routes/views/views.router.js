import { Router } from "express";
import { authorization, tokenResetPassword } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";
import { cartService, productsService, ticketsService, usersService } from "../../services/service.js";
import userDTO from "../../services/dto/user.dto.js";

const viewsRouter = Router();

//Basic redirection
viewsRouter.get("/", (req, res) => {
  res.redirect("/login");
});

//ADMIN VISTAS

//Admin
viewsRouter.get(
  "/admin",
  passportCall("jwt"),
  authorization("admin"),
  (req, res) => {
    res.render("admin", {
      title: "Admin Manager",
      user: req.user,
    });
  }
);

//Products
viewsRouter.get(
  "/realtimeproducts",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const products = await productsService.getAll();
    res.render("realTimeProducts", {
      title: "Products Mongoose",
      products,
      user: req.user,
    });
  }
);

//Carts
viewsRouter.get(
  "/cartsadmin",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const carts = await cartService.getAll();
    res.render("cartsAdmin", {
      title: "Carts Mongoose",
      carts,
    });
  }
);

//Users
viewsRouter.get(
  "/users",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const users = await usersService.getAll();
    res.render("users", {
      title: "Users Mongoose",
      users,
    });
  }
);

//Tickets
viewsRouter.get(
  "/tickets",
  passportCall("jwt"),
  authorization("admin"),
  async (req, res) => {
    const tickets = await ticketsService.getAll();
    res.render("tickets", {
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

//---PERFIL
viewsRouter.get(
  "/current",
  passportCall("jwt"),
  authorization(["user", "admin", "premium"]),
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
  authorization(["user", "premium", "admin"]),
  (req, res) => {
    res.render("chat", {
      title: "Chat",
      user: req.user,
    });
  }
);

//Productos
viewsRouter.get(
  "/products",
  passportCall("jwt"),
  authorization(["admin", "user", "premium", "owner"]),
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
  authorization(["user", "premium", "admin", "owner"]),
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

// //Card payment
// viewsRouter.get(
//   "/cardPayment/:ticketId",
//   passportCall("jwt"),
//   authorization(["user", "premium"]),
//   (req, res) => {
//     const ticketId = req.params.ticketId;
//     res.render("paymentCard", {
//       title: "Card Payment",
//       user: req.user,
//       ticketId: ticketId,
//     });
//   }
// );
export { viewsRouter };