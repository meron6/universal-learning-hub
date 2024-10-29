
const express = require('express');
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes

// @route   GET /api/lessons
// @desc    Get all lessons, with optional search and filters
// @access  Public
router.get('/', lessonController.getAllLessons);

// @route   GET /api/lessons/:id
// @desc    Get a single lesson by ID
// @access  Public
router.get('/:id', lessonController.getLessonById);

// @route   POST /api/lessons
// @desc    Create a new lesson (Protected route)
// @access  Private
router.post('/', authMiddleware.protect, lessonController.createLesson);

// @route   PUT /api/lessons/:id
// @desc    Update an existing lesson by ID (Protected route)
// @access  Private
router.put('/:id', authMiddleware.protect, lessonController.updateLesson);

// @route   DELETE /api/lessons/:id
// @desc    Delete a lesson by ID (Protected route)
// @access  Private
router.delete('/:id', authMiddleware.protect, lessonController.deleteLesson);

module.exports = router;