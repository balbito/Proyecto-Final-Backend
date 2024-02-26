import { Router } from "express";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const adminRouter = Router();

adminRouter.get(
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

export { adminRouter };