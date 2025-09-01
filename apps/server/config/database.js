const { ENV } = require("../src/utils/env");

require("dotenv").config();

module.exports = {
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: ENV.DB_ENGINE,
  logging: ENV.NODE_ENV !== "production",
  pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  define: {
    // Allow snake_case naming in attributes
    underscored: true,
    // Add the timestamps attributes createdAt and updatedAt
    timestamps: true,
    // Change how createdAt is called
    createdAt: "created_at",
    // Change how updatedAt is called
    updatedAt: "updated_at",
    // Don't delete database entries, but set the newly added attribute deletedAt
    // to the date when deletion was done
    paranoid: true,
    // Change how deletedAt is called
    deletedAt: "deleted_at",
    // Disable the modification of tablenames
    freezeTableName: true,
  },
};
