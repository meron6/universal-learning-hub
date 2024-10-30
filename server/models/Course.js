const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id/quiz', async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ courseId: req.params.id });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;