import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Dashboard.css';

function Dashboard({ user }) {
  const [loading, setLoading] = useState(false);
  
  // Dummy training data
  const trainingCourses = [
    { id: 1, title: 'Introduction to Web Development', duration: '4 weeks', level: 'Beginner', enrolled: true },
    { id: 2, title: 'JavaScript Fundamentals', duration: '6 weeks', level: 'Beginner', enrolled: true },
    { id: 3, title: 'React Basics', duration: '8 weeks', level: 'Intermediate', enrolled: false },
    { id: 4, title: 'Advanced CSS Techniques', duration: '3 weeks', level: 'Intermediate', enrolled: false },
    { id: 5, title: 'Backend Development with Node.js', duration: '10 weeks', level: 'Advanced', enrolled: false }
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Training.com</h1>
        <div className="user-info">
          <span>Welcome, {user.displayName || user.email}</span>
          <button className="logout-button" onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>My Training Dashboard</h2>

        <div className="dashboard-section">
          <h3>Available Courses</h3>
          <div className="course-list">
            {trainingCourses.filter(course => !course.enrolled).map(course => (
              <div className="course-card" key={course.id}>
                <h4>{course.title}</h4>
                <p>Duration: {course.duration}</p>
                <p>Level: {course.level}</p>
                <button className="course-button">Join Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
  