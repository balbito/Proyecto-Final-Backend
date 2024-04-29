import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import userModel from "../models/users.model.js";
import { createHash } from "../utils/bcrypt.js";
import config from "./config.js";
import { createCart } from "../utils/utils.js";
import logger from "../utils/logger.js";

const privateKey = config.privateKey;

//Local Strategy
const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  //JWTStrategy with Cookie
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: privateKey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //Github Register/Login
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackUrl: config.callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //User existance in DB validation
          const user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            logger.warning(
              "User doesn't exists with email: " + profile._json.email
            );
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email: profile._json.email,
              password: "",
              loggedBy: "GitHub",
              role: "user",
            };
            const result = await userModel.create(newUser);
            logger.info(
              `User registered with gitHub with email ${newUser.email}`
            );
            return done(null, result);
          } else {
            //If the user exists in DB
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //Passport Local
  //Register
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          //User in DB validation
          const user = await userModel.findOne({ email });
          if (user) {
            logger.info("User registered with provided email: " + email);
            done(null, false);
          }
          //Admin role validation
          let role;
          if (email === "adminCoder@coder.com") {
            role = "admin";
          }
          let cart = {};
          const cartId = await createCart(cart)
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            loggedBy: "App",
            role,
            cart: cartId,
          };
          const result = await userModel.create(newUser);
          logger.info(`User registered locally with email: ${newUser.email}`);
          return done(null, result);
        } catch (error) {
          return done("Error registering user: " + error);
        }
      }
    )
  );

  //Serialize function
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  //Deserialize function
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      logger.error("Error deserializing user: " + error);
    }
  });
};

//CookieExtractor function
const cookieExtractor = (req) => {
  let token = null;
  
  if (req && req.cookies) {
    //Request and cookies validation
    token = req.cookies["jwtCookieToken"];
  }
  return token;
};

export default initializePassport;