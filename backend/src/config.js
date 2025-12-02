require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "jwt_secret",
  JWT_EXP: process.env.JWT_EXP || "7d",

  PG_HOST: process.env.PG_HOST || "localhost",
  PG_PORT: process.env.PG_PORT || 5432,
  PG_USER: process.env.PG_USER || "postgres",
  PG_PASSWORD: process.env.PG_PASSWORD || "postgres",
  PG_DATABASE: process.env.PG_DATABASE || "portal_capacitaciones"
};
