import EErrors from "../errors-enum.js";
import logger from "../../../utils/logger.js";

export default (error, req, res, next) => {
    logger.error("Error detectado entrando al Error Handler");
    logger.info(error.cause);
    switch (error.code) {
      case EErrors.INVALID_TYPES_ERROR:
        res.status(400).send({ status: "error", error: error.message });
        break;
      default:
        res.status(500).send({ status: "error", error: "Unhandled error!" });
    }
  };