const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize: connection } = require("./models");
const swaggerDocs = require("./utils/swagger");
const routes = require("./routes/v1/index");
const errorHandler = require("./middlewares/errorHandler.middleware");
const { ENV } = require("./utils/env");
const { logger } = require("./utils/logger");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ENV.CORS_ALLOWED_ORIGINS
  ? ENV.CORS_ALLOWED_ORIGINS.split(",")
  : [];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// add routes
app.use("/api/v1/", routes);


// healthcheck endpoint
app.use("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

// Aquí llamas a la función que monta SwaggerUI
swaggerDocs(app);

// add custom error handler middleware as the last middleware
app.use(errorHandler);

app.listen(ENV.SERVER_PORT, () => {
  logger.info("API running on port " + ENV.SERVER_PORT);
  connection
    .sync({
      alter: false,
    })
    .then(() => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "The connection to the database engine was successful"
      );

      console.log(
        "\x1b[32m%s\x1b[0m",
        `RUNNING ON PORT: ${ENV.SERVER_PORT}`
      );
    })
    .catch((error) => {
      console.log("\x1b[31m%s\x1b[0m", error.parent);
      process.exit(1);
    });
});
