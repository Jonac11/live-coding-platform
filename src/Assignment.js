import React from "react";
import { useParams } from "react-router-dom";

const Assignment = () => {
  const { id } = useParams();
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  const assignment = assignments.find(a => a.id.toString() === id);

  return (
    <div className="home-page">
      <h1 className="title">Assignment Page</h1>
      {assignment ? (
        <div className="dashboard-container">
          <h2 className="dashboard-title">{assignment.title}</h2>
          <p>{assignment.question}</p>
        </div>
      ) : (
        <p>Assignment not found.</p>
      )}
    </div>
  );
};

export default Assignment;
