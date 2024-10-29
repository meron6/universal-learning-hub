
const mongoose = require('mongoose');

// Define the schema for a Lesson
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A lesson must have a title'],
    trim: true,
    minlength: [5, 'A lesson title must have at least 5 characters'],
    maxlength: [100, 'A lesson title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'A lesson must have a description'],
    trim: true,
    minlength: [10, 'A lesson description must have at least 10 characters'],
  },
  content: {
    type: String,
    required: [true, 'Lesson content cannot be empty'],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  duration: {
    type: Number, // Duration in minutes
    default: 0,
    min: [0, 'Duration cannot be negative'],
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Middleware to set updatedAt before saving if data is modified
lessonSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Custom method to format lesson data for the client
lessonSchema.methods.formatForClient = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    content: this.content,
    imageUrl: this.imageUrl,
    videoUrl: this.videoUrl,
    duration: this.duration,
    level: this.level,
    tags: this.tags,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

// Indexing to optimize search on title and tags
lessonSchema.index({ title: 'text', tags: 'text' });

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;