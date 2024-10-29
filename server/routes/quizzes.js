const express = require('express');
const Quiz = require('../models/Quiz'); // Make sure you create a Quiz model
const Course = require('../models/Course'); // Assuming quizzes are associated with courses
const router = express.Router();

// Create a new quiz
router.post('/:courseId', async (req, res) => {
  const { courseId } = req.params;
  const { question, options, answer } = req.body;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new quiz
    const newQuiz = { question, options, answer };
    course.quizzes.push(newQuiz);
    await course.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all quizzes for a specific course
router.get('/:courseId', async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course.quizzes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit a quiz answer
router.post('/submit', async (req, res) => {
  const { quizId, selectedOptions } = req.body; // selectedOptions should be an array of answers

  // Here you would have logic to check the selectedOptions against the correct answers
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const isCorrect = selectedOptions.includes(quiz.answer); // Simple check for correctness
    res.json({ correct: isCorrect });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;