// Modules imports:
import express from 'express';
import handlebars from  'express-handlebars';
import Handlebars from 'handlebars';

// Passport imports:
import passport from "passport";
import cookieParser from 'cookie-parser';
import initializePassport from "./config/config.js";

// Router imports:
import productRouter from './routes/api/products.router.js';
import cartRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/views/views.router.js';
import usersRouter from './routes/api/users.router.js';
import userViewRouter from './routes/views/users.views.router.js';
import jwtRouter from './routes/api/jwt.router.js';
import githubLoginViewsRouter from './routes/views/github-login.views.routes.js';
import actionRouter from './routes/api/users.actions.routes.js';

// Assets imports:
import { Server } from 'socket.io';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import basePath from './utils/utils.js';
import messagesDao from './daos/dbManager/messages.dao.js';

// Config imports:
import config from './config/config.js';
import MongoSingleton from "./config/mongodb_Singleton.js";
import cors from 'cors';

// SERVER
const app = express();
const PORT = config.port;
const httpServer = app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initializePassport();
app.use(passport.initialize());
app.use(cors());

//Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      ifRoleEquals: function (role, targetRole, options) {
        return role === targetRole ? options.fn(this) : options.inverse(this);
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", `${basePath}/views`);

//Static
app.use(express.static(`${basePath}/public`));

// MONGOOSE
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.log(error);
  }
};
mongoInstance();

// SOCKET
const io = new Server(httpServer);

//Cookies
app.use(cookieParser("CoderS3cr3tC0d3"));

// ROUTES
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/actions", actionRouter);


// VIEWROUTER
app.use("/", viewsRouter);
app.use("/users", userViewRouter);
app.use("/github", githubLoginViewsRouter);


io.on("connection", (socket) => {
  console.log("client connected" + socket.id);

  socket.on("message", async (data) => {
    // servidor recibe el mensaje
    console.log(data);
    await messagesDao.createMessage(data)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected" + socket.id);
  })

});