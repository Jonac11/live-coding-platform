import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import BlocklyComponent from "./BlocklyComponent";
import Simulation from "./simulation";
import Home from "./Home";
import Tutorials from "./Tutorials";
import Assignment from "./Assignment";
import "./styles.css";

const MainPage = ({ assignment }) => {
  const [showCamera, setShowCamera] = useState(false);
  const simulationRef = useRef(null);

  const executeInSimulation = (commands) => {
    console.log("Blockly commands:", commands); 
    if (simulationRef.current) {
      simulationRef.current.executeCommands(commands);
    }
  };

  return (
    <main>
      {/* Instructions Section */}
      <section id="instructions">
        <h2>Instructions</h2>
        {assignment ? (
          <>
            <h3>{assignment.title}</h3>
            <p>{assignment.question}</p>
          </>
        ) : (
          <p>Here you will provide detailed instructions for the user.</p>
        )}

        {/* Toggle View */}
        <button onClick={() => setShowCamera(false)} style={{ backgroundColor: !showCamera ? 'lightblue' : 'grey' }}>Simulation View</button>
        <button onClick={() => setShowCamera(true)} style={{ backgroundColor: showCamera ? 'lightblue' : 'grey' }}>Camera View</button>
      </section>

      {/* Workspace */}
      <div id="workspace-container">
        <Simulation ref={simulationRef} showCamera={showCamera} />
        <BlocklyComponent showCamera={showCamera} executeInSimulation={executeInSimulation} />
      </div>
    </main>
  );
};

const AppWrapper = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assignmentId = queryParams.get("assignmentId");

  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    if (assignmentId) {
      const allAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
      const found = allAssignments.find(a => a.id.toString() === assignmentId);
      setAssignment(found);
    } else {
      setAssignment(null);
    }
  }, [assignmentId]);

  return (
    <div>
      {/* Header */}
      <header>
        <nav>
          <Link to="/"><button>Main</button></Link>
          <Link to="/home"><button>Home</button></Link>
          <Link to="/tutorials"><button>Tutorials</button></Link>
          <button>Results</button>
          <button>Settings</button>
        </nav>
      </header>

      {/* Title */}
      <div id="title">
        <h1>K-12 Live Coding Platform</h1>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<MainPage assignment={assignment} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/assignment/:id" element={<Assignment />} />
      </Routes>

      {/* Footer */}
      <footer>
        <button onClick={() => alert("Going Back")}>Back</button>
      </footer>
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
