const pool = require('../db');

async function listAll() {
  const result = await pool.query(
    `SELECT id, module, title, description FROM courses ORDER BY module, title`
  );
  return result.rows;
}

async function create(course) {
  const { module, title, description } = course;
  const result = await pool.query(
    `INSERT INTO courses (module, title, description)
     VALUES ($1, $2, $3) RETURNING id, module, title, description`,
    [module, title, description]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    `SELECT id, module, title, description FROM courses WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function update(id, course) {
  const { module, title, description } = course;
  const result = await pool.query(
    `UPDATE courses SET module = $1, title = $2, description = $3 WHERE id = $4
     RETURNING id, module, title, description`,
    [module, title, description, id]
  );
  if (result.rows.length === 0) {
    return { changes: 0 };
  }
  return { changes: 1, course: result.rows[0] };
}

async function remove(id) {
  const result = await pool.query(
    `DELETE FROM courses WHERE id = $1`,
    [id]
  );
  return result.rowCount;
}

module.exports = { listAll, create, findById, update, remove };
