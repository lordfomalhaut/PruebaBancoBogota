const courseModel = require('../models/course.model');

async function listCourses(req, res) {
  try {
    const courses = await courseModel.listAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error listing courses', error: err.message });
  }
}

async function createCourse(req, res) {
  const { module, title, description } = req.body;
  if (!module || !title) return res.status(400).json({ message: 'module and title required' });

  try {
    const result = await courseModel.create({ module, title, description });
    res.status(201).json({ id: result.id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
}

async function getCourse(req, res) {
  const id = req.params.id;
  try {
    const course = await courseModel.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
}

async function updateCourse(req, res) {
  const id = req.params.id;
  try {
    const result = await courseModel.update(id, req.body);
    if (result.changes === 0) return res.status(404).json({ message: 'Course not found or no changes' });
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating course', error: err.message });
  }
}

async function deleteCourse(req, res) {
  const id = req.params.id;
  try {
    const result = await courseModel.remove(id);
    if (result.changes === 0) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
}

module.exports = { listCourses, createCourse, getCourse, updateCourse, deleteCourse };
