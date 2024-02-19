import { Router } from 'express';
import passport from 'passport';

const router = Router();

/** Github */
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    {

    }
  })

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }),
  async (req, res) => {
    const user = req.user;
    req.session.rol = "user";
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: req.session.rol,
    };

    req.session.admin = true;
    res.redirect("/products");
  })

/** Passport Local */

// Register
router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/session/fail-register",
  }),
  async (req, res) => {
    console.log("Registrando usuario");
    res
      .status(200)
      .send({ status: "success", payload: "Usuario creado con exito" });
  }
);

// Login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "api/fail-login",
  }),
  async (req, res) => {
    const user = req.user;
    console.log(user);

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
      age: user.age,
    };

    res.send({
      status: "success",
      payload: req.session.user,
      message: "¡Primer logueo realizado! :)",
    });
  }
);

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res
        .status(500)
        .send({ status: "error", msg: "Internal Server Error" });
    }
    res.redirect("/users/login");
  });
});

router.get("/fail-register", (req, res) => {
  res.status(401).send({ error: "Failed to process register" });
});

router.get("/fail-login", (req, res) => {
  res.status(401).send({ error: "Failed to process login" });
});


export default router;