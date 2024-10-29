require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});