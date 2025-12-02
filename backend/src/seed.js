const pool = require('./db');
const bcrypt = require('bcryptjs');

async function run() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT DEFAULT 'user'
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      module TEXT,
      title TEXT,
      description TEXT
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS progress (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
      status TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_progress_user_course ON progress(user_id, course_id);`);

    const courses = [
      ['Fullstack', 'Intro a Node.js', 'Fundamentos de Node.js y Express'],
      ['Cloud', 'Introducción a AWS', 'Servicios básicos de AWS'],
      ['APIs e Integraciones', 'REST APIs con Express', 'Construcción de APIs con Node'],
      ['Data Engineer', 'Fundamentos de ETL', 'Pipelines y almacenamiento']
    ];

    for (const c of courses) {
      await pool.query(
        `INSERT INTO courses (module, title, description) VALUES ($1, $2, $3)`,
        c
      );
    }

    const adminPass = bcrypt.hashSync('admin123', 8);
    const userPass = bcrypt.hashSync('user123', 8);

    await pool.query(
      `INSERT INTO users (username, password, name, role)
       VALUES ('admin', $1, 'Admin Test', 'admin')
       ON CONFLICT (username) DO NOTHING`,
      [adminPass]
    );

    await pool.query(
      `INSERT INTO users (username, password, name, role)
       VALUES ('user', $1, 'User Test', 'user')
       ON CONFLICT (username) DO NOTHING`,
      [userPass]
    );

    console.log("PostgreSQL seed executed successfully.");
    process.exit(0);

  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

run();
