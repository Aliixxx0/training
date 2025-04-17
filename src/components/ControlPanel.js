import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';
import './Dashboard.css';

function ControlPanel({ user }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dummy training data
  const trainingCourses = [
    { id: 1, title: 'React Basics', duration: '8 weeks', level: 'Intermediate', students: 22 },
    { id: 2, title: 'Advanced CSS Techniques', duration: '3 weeks', level: 'Intermediate', students: 15 },
    { id: 3, title: 'Backend Development with Node.js', duration: '10 weeks', level: 'Advanced', students: 10 }
  ];

  useEffect(() => {
    // Fetch users from the database
    const fetchUsers = async () => {
      try {
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
        
        if (snapshot.exists()) {
          const usersData = [];
          snapshot.forEach((childSnapshot) => {
            usersData.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
    <div className="dashboard-container admin-dashboard">
      <div className="dashboard-header">
        <h1>Training.com - Admin Panel</h1>
        <div className="user-info">
          <span>Admin: {user.email}</span>
          <button className="logout-button" onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        
        <div className="dashboard-section">
          <h3>Course Management</h3>
          <div className="admin-panel">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Level</th>
                  <th>Students</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainingCourses.map(course => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.duration}</td>
                    <td>{course.level}</td>
                    <td>{course.students}</td>
                    <td>
                      <button className="action-button edit">Edit</button>
                      <button className="action-button delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-button">Add New Course</button>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>User Management</h3>
          <div className="admin-panel">
            {isLoading ? (
              <p>Loading users...</p>
            ) : (
              <>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>User ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.name || 'N/A'}</td>
                        <td>{user.uid}</td>
                        <td>
                          <button className="action-button view">View</button>
                          <button className="action-button delete">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
  