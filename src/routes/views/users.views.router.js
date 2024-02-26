import { Router } from "express";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";
import userDTO from "../../services/dto/user.dto.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get(
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
export default router;