// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import Lesson from '../components/Lesson';

const HomePage = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // This simulates fetching lesson data, replace with real API call if needed
    const lessonData = [
      {
        title: "Intro to Web Development",
        description: "Learn the fundamentals of HTML, CSS, and JavaScript to build your first website.",
        image: "path/to/your/image1.jpg"
      },
      {
        title: "Advanced JavaScript",
        description: "Deep dive into JavaScript, including ES6, asynchronous programming, and more.",
        image: "path/to/your/image2.jpg"
      },
      // Add more lessons as necessary
    ];

    setLessons(lessonData);
  }, []);

  return (
    <div>
      <h1>Welcome to Universal Learning Hub</h1>
      <h2>Available Lessons</h2>
      <div className="lesson-container">
        {lessons.map((lesson, index) => (
          <Lesson key={index} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;