const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.get('/me', authMiddleware, progressController.getMyProgress);
router.post('/start/:courseId', authMiddleware, progressController.markStart);
router.post('/complete/:courseId', authMiddleware, progressController.markComplete);

module.exports = router;
