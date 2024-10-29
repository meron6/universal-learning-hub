
const Lesson = require('../models/lessonModel');

// Controller function to retrieve all lessons
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve lessons. Please try again later.",
    });
  }
};

// Controller function to retrieve a single lesson by its ID
exports.getLessonById = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: `Lesson with ID ${id} not found`,
      });
    }

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    console.error(`Error fetching lesson with ID ${id}:`, error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the lesson.",
    });
  }
};

// Controller function to create a new lesson
exports.createLesson = async (req, res) => {
  const { title, description, content } = req.body;

  // Basic validation
  if (!title || !description || !content) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, description, and content for the lesson.",
    });
  }

  try {
    const lesson = await Lesson.create({ title, description, content });
    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create lesson. Please try again.",
    });
  }
};

// Controller function to update an existing lesson by ID
exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, description, content } = req.body;

  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { title, description, content },
      { new: true, runValidators: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({
        success: false,
        message: `Lesson with ID ${id} not found`,
      });
    }

    res.status(200).json({ success: true, data: updatedLesson });
  } catch (error) {
    console.error(`Error updating lesson with ID ${id}:`, error);
    res.status(500).json({
      success: false,
      message: "Failed to update lesson. Please try again.",
    });
  }
};

// Controller function to delete a lesson by its ID
exports.deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLesson = await Lesson.findByIdAndDelete(id);

    if (!deletedLesson) {
      return res.status(404).json({
        success: false,
        message: `Lesson with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Lesson with ID ${id} has been deleted`,
    });
  } catch (error) {
    console.error(`Error deleting lesson with ID ${id}:`, error);
    res.status(500).json({
      success: false,
      message: "Failed to delete lesson. Please try again.",
    });
  }
};