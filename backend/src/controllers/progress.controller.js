const progressModel = require('../models/progress.model');
const courseModel = require('../models/course.model');
const pool = require('../db');

async function getMyProgress(req, res) {
  const userId = req.user.id;
  try {
    const progress = await progressModel.getUserProgress(userId);
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching progress', error: err.message });
  }
}

async function markStart(req, res) {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  try {
    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const randomPercentage = Math.floor(Math.random() * 101);
    const progress = await progressModel.upsertProgress(userId, courseId, 'iniciado', randomPercentage);
    
    const result = await pool.query(
      `SELECT p.*, c.title, c.module 
       FROM progress p 
       JOIN courses c ON c.id = p.course_id 
       WHERE p.id = $1`,
      [progress.id]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error marking start', error: err.message });
  }
}

async function markComplete(req, res) {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  try {
    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const progress = await progressModel.upsertProgress(userId, courseId, 'completado', 100);
    
    const result = await pool.query(
      `SELECT p.*, c.title, c.module 
       FROM progress p 
       JOIN courses c ON c.id = p.course_id 
       WHERE p.id = $1`,
      [progress.id]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error marking complete', error: err.message });
  }
}

module.exports = { getMyProgress, markStart, markComplete };
