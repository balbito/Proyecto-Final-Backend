import { Router } from "express";
import logger from "../../utils/logger.js";

const router = Router();

router.get("/", (req, res) => {
  logger.fatal("This is a fatal log example message");
  logger.error("This is a error log example message");
  logger.warning("This is a warning log example message");
  logger.info("This is a info log example message");
  logger.http("This is a http log example message");
  logger.debug("This is a debug log example message");
  res.send({ status: "success" });
});

export default router;