const { z } = require('zod');
const { config } = require('dotenv');
const { environments } = require('../constants/constants.js');

config();

const envSchema = z.object({
  NODE_ENV: z.enum(environments),
  SERVER_PORT: z.coerce.number().default(5001),

  LOG_LEVEL: z.string(),

  DB_ENGINE: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_STATUS: z.string(),

  SALT_ROUNDS: z.coerce.number().int(),
  JWT_SECRET: z.string(),

  CORS_ALLOWED_ORIGINS: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.log(result.error.format());
    process.exit(1);
}

const ENV = result.data;

module.exports = { ENV };
