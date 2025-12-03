const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PG_HOST || 'postgres',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'portal_capacitaciones'
});

async function waitForPostgres() {
  let retries = 30;
  while (retries > 0) {
    try {
      await pool.query('SELECT 1');
      console.log('PostgreSQL está listo!');
      await pool.end();
      return;
    } catch (err) {
      retries--;
      console.log(`Esperando PostgreSQL... (${30 - retries}/30)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  console.error('No se pudo conectar a PostgreSQL después de 30 intentos');
  process.exit(1);
}

waitForPostgres();

