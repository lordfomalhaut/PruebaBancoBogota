const pool = require('../db');

async function getUserProgress(userId) {
  const result = await pool.query(
    `
    SELECT p.id, p.course_id, p.status, p.percentage, p.updated_at,
           c.title, c.module
    FROM progress p
    JOIN courses c ON c.id = p.course_id
    WHERE p.user_id = $1
    ORDER BY p.updated_at DESC
    `,
    [userId]
  );
  return result.rows;
}

async function upsertProgress(userId, courseId, status, percentage = null) {
  let query, params;
  
  if (percentage !== null) {
    query = `
      INSERT INTO progress (user_id, course_id, status, percentage)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, course_id)
      DO UPDATE SET status = EXCLUDED.status, percentage = EXCLUDED.percentage, updated_at = CURRENT_TIMESTAMP
      RETURNING id
    `;
    params = [userId, courseId, status, percentage];
  } else {
    query = `
      INSERT INTO progress (user_id, course_id, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, course_id)
      DO UPDATE SET status = EXCLUDED.status, updated_at = CURRENT_TIMESTAMP
      RETURNING id
    `;
    params = [userId, courseId, status];
  }
  
  const result = await pool.query(query, params);
  return result.rows[0];
}

module.exports = { getUserProgress, upsertProgress };
