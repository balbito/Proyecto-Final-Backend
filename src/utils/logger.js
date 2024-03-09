import winston from "winston";
import config from "../config/config.js";

const customLevelsOptions = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5,
    },
    colors: {
      fatal: "bold red",
      error: "bold magenta",
      warning: "bold yellow",
      info: "bold green",
      http: "bold cyan",
      debug: "bold blue",
    },
  };
  
  winston.addColors(customLevelsOptions.colors);
  
  const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.printf(
            (info) => `${info.timestamp} - ${info.level}: ${info.message}`
          )
        ),
      }),
      new winston.transports.File({
        filename: "./prodErrors.log",
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.printf(
            (info) => `${info.timestamp} - ${info.level}: ${info.message}`
          )
        ),
      }),
    ],
  });
  
  const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.printf(
            (info) => `${info.timestamp} - ${info.level}: ${info.message}`
          )
        ),
      }),
    ],
  });
  
  let logger;
  
  if (config.enviroment === "prod") {
    logger = prodLogger;
  } else {
    logger = devLogger;
  }
  
  export default logger;
  
  export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url}`);
    next();
  };