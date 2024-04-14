import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Debug variable", false)
  .option("-p <port>", "Server Port", 9090)
  .option("--mode <mode>", "Work mode", "dev");
program.parse();

const enviroment = "prod";

dotenv.config({
  path:
    enviroment === "prod"
      ? "./src/config/.env.production"
      : "./src/config/.env.development",
});

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  enviroment: program.opts().mode,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: process.env.GITHUB_CALLBACK_URL,
  privateKey: process.env.PRIVATE_KEY,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  gmailAppPassword: process.env.GMAIL_APP_PASSWD,
  cookieSecret: process.env.COOKIE_PARSER_SECRET
};