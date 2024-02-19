import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

//Local Strategy
const localStrategy = passportLocal.Strategy;


const initializePassport = () => {

    // Usando github
    passport.use('github', new GitHubStrategy(
        {
          clientID: 'Iv1.9f49bf533c1f98d0',
          clientSecret: '9f4b9782d610fb4cb7855ed26e9df1d01703895b',
          callbackUrl: 'htttp://localhost:8080/api/sessions/githubcallback'
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log("profile obtenido del usuario de Github: ")
            console.log(profile)

            try {
                // Validamos si existe en la DB
                const user = await userModel.findOne({ email: profile._json.email });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if(!user){
                    console.warn(
                        "User doesn't exists with email: " + profile._json.email);
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 18,
                    email: profile._json.email,
                    password: "",
                    loggedBy: "GitHub",
                    rol: "user",
                  };
                  const result = await userModel.create(newUser);
                  return done(null, result);
                } else {
                  // Si entramos por aca significa que el user ya existe en la DB
                  return done(null, user);
                }
            } catch (error) {
                return done(error)
            }
        }
    ));

    //Passport Local
    //Register
    passport.use(
        "register",
        new localStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    const user = await userModel.findOne({ email });
                    if (user) {
                        console.log("User registered with provided email");
                        done(null, false);
                    }
                    let role;
                    if (email === "adminCoder@coder.com") {
                        role = "admin";
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        loggedBy: "App",
                        role,
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done("Error registering user: " + error);
                }
            }
        )
    );

    //Login
    passport.use(
        "login",
        new localStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username });
                    console.log("User found for login:");
                    console.log(user);
                    if (!user) {
                        console.warn("No user registered with email: " + username);
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        console.warn("Invalid credentials");
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
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
            console.error("Error deserializing user: " + error);
        }
    });
};

export default initializePassport;