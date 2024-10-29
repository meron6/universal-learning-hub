const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
  const { title, description, content, quizzes } = req.body;

  try {
    const course = new Course({ title, description, content, quizzes });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;