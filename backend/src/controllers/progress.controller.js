const progressModel = require('../models/progress.model');
const courseModel = require('../models/course.model');

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

    await progressModel.upsertProgress(userId, courseId, 'iniciado');
    res.json({ message: 'Marked as iniciado' });
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

    await progressModel.upsertProgress(userId, courseId, 'completado');
    res.json({ message: 'Marked as completado' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking complete', error: err.message });
  }
}

module.exports = { getMyProgress, markStart, markComplete };
