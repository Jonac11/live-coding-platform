import React from "react";
import "./styles.css"; // Ensure styles are properly linked
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Load assignments from localStorage
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  return (
    <div className="home-page">
      {/* Header Section */}
      <h1 className="title">Home Page</h1>

      {/* Main Content */}
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome Jona!</h2>

        <div className="dashboard-content">
          {/* Left Column - Tasks */}
          <div className="tasks-section">
            <h3>Tasks</h3>
            {assignments.length > 0 ? (
              assignments.map((task) => (
                <div 
                  key={task.id} 
                  className="task-card"
                  onClick={() => navigate(`/?assignmentId=${task.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <p className="task-title">{task.title}</p>
                  <p className="task-desc">Click to view</p>
                </div>
              ))
            ) : (
              <p>No assignments posted yet.</p>
            )}
          </div>

          {/* Right Column - Notifications */}
          <div className="notifications-section">
            <h3>Notifications</h3>
            <div className="notification-card">New Grades</div>
            <div className="notification-card">New Tutorials</div>
            <div className="notification-card"></div>
            <div className="notification-card"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
