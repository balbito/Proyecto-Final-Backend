import userModel from "../dao/models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { generateJWToken } from "../utils/passport.js";

export const githubRegister = async (req, res) => {};

export const githubCallback = async (req, res) => {
  const user = req.user;
  const tokenUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role,
    id: user._id,
  };
  const access_token = generateJWToken(tokenUser);
  console.log(access_token);

  res.cookie("jwtCookieToken", access_token, {
    maxAge: 600000,
    httpOnly: true,
  });
  res.redirect("/products");
};

export const register = async (req, res) => {
  console.log("Registering user");
  res.status(201).send({ status: "success", message: "Success creating user" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    console.log("User found for login:");
    console.log(user);
    if (!user) {
      console.warn("No user with provided email: " + email);
      return res.status(204).send({
        error: "Not found",
        message: "No user found with provided email: " + email,
      });
    }
    if (!isValidPassword(user, password)) {
      console.warn("Invalid credentials");
      return res.status(401).send({
        status: "error",
        error: "Invalid credentials",
      });
    }
    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      id: user._id,
    };
    const access_token = generateJWToken(tokenUser);
    console.log(access_token);

    res.cookie("jwtCookieToken", access_token, {
      maxAge: 600000,
      httpOnly: true,
    });
    res.redirect("/products");
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "Intern app error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwtCookieToken");
  res.redirect("/users/login");
};