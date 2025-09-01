const { ValidationError } = require("sequelize");
const { ZodError } = require("zod");
const { getReasonPhrase } = require("http-status-codes");

const { ENV } = require("../utils/env.js");
const { HttpError } = require("../utils/HttpError.js");
const { logger } = require("../utils/logger.js");

function errorHandler(error, req, res, next) {
  if (error.name == "TokenExpiredError") {
    return res.status(403).json({
      message: "Session expired",
    });
  } else if (error instanceof ValidationError) {
    const mappedErrors = {};
    error.errors.forEach((errorItem) => {
      mappedErrors[errorItem.path] = errorItem.message;
    });

    res.status(422).json({
      message: "Asegurate de llenar la información correctamente",
      errors: mappedErrors,
    });
    return;
  } else if (error.name == "JsonWebTokenError") {
    return res.status(403).json({
      message: "Bad credentials",
    });
  } else if (error instanceof ZodError) {
    const formattedErrors = error.format();

    return res.status(422).json({
      message: "Asegurate de llenar la información correctamente",
      errors: formattedErrors,
    });
  } else if (error instanceof HttpError) {
    return res.status(error.status).json(error.toProblemDetails());
  } else {
    logger.error(error);
    return res.status(500).json({
      message:
        ENV.NODE_ENV == "development" ? error.message : getReasonPhrase(500),
    });
  }
}

module.exports = errorHandler;
