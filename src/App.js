import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BlocklyComponent from "./BlocklyComponent";
import Simulation from "./simulation";
import Home from "./Home";
import Tutorials from "./Tutorials";
import "./styles.css"; // Make sure your styles are imported here

const App = () => {
  return (
    <Router>
      <div>
        {/* Header Section */}
        <header>
          <nav>
            <Link to="/"><button>Main</button></Link> {/* This keeps your existing page as default */}
            <Link to="/home"><button>Home</button></Link>
            <Link to="/tutorials"><button>Tutorials</button></Link>
            <button>Results</button>
            <button>Settings</button>
          </nav>
        </header>

        {/* Title Section */}
        <div id="title">
          <h1>K-12 Live Coding Platform</h1>
        </div>

        {/* Routing for different pages */}
        <Routes>
          {/* Default page (Blockly & Simulation) remains as the main page */}
          <Route 
            path="/" 
            element={
              <main>
                {/* Instructions Section */}
                <section id="instructions">
                  <h2>Instructions</h2>
                  <p>Here you will provide detailed instructions for the user.</p>
                </section>

                {/* Workspace Container */}
                <div id="workspace-container">
                  <Simulation />
                  <BlocklyComponent />
                </div>
              </main>
            } 
          />

          {/* Additional Pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/tutorials" element={<Tutorials />} />
        </Routes>

        {/* Footer Section */}
        <footer>
          <button onClick={() => alert("Going Back")}>Back</button>
        </footer>
      </div>
    </Router>
  );
};

export default App;
