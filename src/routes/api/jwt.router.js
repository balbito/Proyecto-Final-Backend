import { Router } from "express";
import passport from "passport";
import {
    githubCallback,
    githubRegister,
    login,
    logout,
    register,
} from "../../controllers/jwtControllers.js"

const router = Router();

//Register
router.post(
    "/register",
    passport.authenticate("register", { session: false }),
    register
);

//Login
router.post("/login", login);

//Logout
router.post("/logout", logout);

//Github register
router.get(
    "/github",
    passport.authenticate("github", { scoope: ["user:email"] }),
    githubRegister
);

//Github callback
router.get(
    "/githubcallback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/github/error",
    }),
    githubCallback
);

export default router;