const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  host: config.PG_HOST,
  port: config.PG_PORT,
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => {
    console.error("Error connecting to PostgreSQL:", err);
    process.exit(1);
  });

module.exports = pool;
