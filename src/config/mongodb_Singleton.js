import mongoose from "mongoose";
import config from "./config.js";
import logger from "../utils/logger.js";
export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  //Singleton implementation
  static getInstance() {
    if (this.#instance) {
      logger.info("Connection already opened with MongoDB");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.mongoUrl);
      logger.info("Success connecting DB using Mongoose");
    } catch (error) {
      logger.error("Unable to connect to DB using Mongoose: " + error);
      process.exit();
    }
  };
}