const CourseCard = ({ course }) => {
    return (
      <div className="course-card">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <a href={`/courses/${course._id}`} className="course-link">View Course</a>
      </div>
    );
  };
  
  export default CourseCard;  