import React from "react";
import "./styles.css"; // Ensure styles are properly linked

const Home = () => {
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
            <div className="task-card"> 
              <p className="task-title">Project 1</p>
              <p className="task-desc">Description</p>
            </div>
            <div className="task-card"> 
              <p className="task-title">Project 2</p>
              <p className="task-desc">Description</p>
            </div>
            <div className="task-card"> 
              <p className="task-title">Project 3</p>
              <p className="task-desc">Description</p>
            </div>
            <div className="task-card"> 
              <p className="task-title">Project 4</p>
              <p className="task-desc">Description</p>
            </div>
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
