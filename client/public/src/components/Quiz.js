import { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(`/api/quizzes/${quizId}`);
      setQuiz(response.data);
    };

    fetchQuiz();
  }, [quizId]);

  const handleChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    await axios.post(`/api/quizzes/${quizId}/submit`, { answers: selectedAnswers });
    setSubmitted(true);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((question) => (
        <div key={question._id}>
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name={question._id}
                value={option}
                checked={selectedAnswers[question._id] === option}
                onChange={() => handleChange(question._id, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      {submitted && <p>Thank you for your submission!</p>}
    </div>
  );
};

export default Quiz;