import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [slidePreviews, setSlidePreviews] = useState([]);

  // Load from localStorage on component mount
  useEffect(() => {
    const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const storedVideos = JSON.parse(localStorage.getItem("videoPreviews")) || [];
    const storedSlides = JSON.parse(localStorage.getItem("slidePreviews")) || [];

    setAssignments(storedAssignments);
    setVideoPreviews(storedVideos);
    setSlidePreviews(storedSlides);
  }, []);

  return (
    <div className="home-page">
      <h1 className="title">Home Page</h1>

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

          {/* Right Column - Latest Materials */}
          <div className="notifications-section">
            <h3>Latest Materials</h3>

            {/* Show 1-2 videos */}
            {videoPreviews.slice(0, 2).map((video) => (
              <div key={video.id} className="notification-card">
                <video src={video.url} controls width="100%" style={{ borderRadius: "8px" }} />
                <p style={{ marginTop: "8px", fontWeight: "bold" }}>{video.title}</p>
              </div>
            ))}

            {/* Show 1-2 slides */}
            {slidePreviews.slice(0, 2).map((slide, index) => (
              <div key={slide.id || index} className="notification-card">
                {slide.isPDF ? (
                  <iframe
                    src={slide.url}
                    title={`Slide ${index + 1}`}
                    width="100%"
                    height="100px"
                    style={{ border: "none" }}
                  />
                ) : (
                  <img
                    src={slide.url}
                    alt={`Slide ${index + 1}`}
                    width="100%"
                    style={{ borderRadius: "8px", height: "auto" }}
                  />
                )}
              </div>
            ))}

            <button className="resource-btn" onClick={() => navigate("/tutorials")} style={{ marginTop: "10px" }}>
              View All Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
