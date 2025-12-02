const pool = require('../db');

async function findByUsername(username) {
  const result = await pool.query(
    `SELECT id, username, password, name, role FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    `SELECT id, username, name, role FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

module.exports = { findByUsername, findById };
