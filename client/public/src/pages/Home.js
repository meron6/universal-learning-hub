import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Universal Learning Hub</h1>
      <p>
        Your go-to platform for engaging and interactive learning experiences.
        Explore our wide range of courses and quizzes to enhance your knowledge
        and skills.
      </p>
      <div className="home-links">
        <Link to="/courses" className="button">Browse Courses</Link>
        <Link to="/quizzes" className="button">Take Quizzes</Link>
      </div>
    </div>
  );
};

export default Home;