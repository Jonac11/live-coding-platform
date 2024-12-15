import React from "react";
import BlocklyComponent from "./BlocklyComponent";
import "./styles.css"; // Make sure your styles are imported here

const App = () => {
  return (
    <div>
      {/* Header Section */}
      <header>
        <nav>
          <button>Home</button>
          <button>Tutorials</button>
          <button>Results</button>
          <button>Settings</button>
        </nav>
      </header>

      {/* Title Section */}
      <div id="title">
        <h1>K-12 Live Coding Platform</h1>
      </div>

      {/* Main Workspace */}
      <main>
        {/* Instructions Section */}
        <section id="instructions">
          <h2>Instructions</h2>
          <p>Here you will provide detailed instructions for the user.</p>
        </section>

        {/* Workspace Container */}
        <div id="workspace-container">
          {/* Simulation Section */}
          <div id="simulation">
            <h3>Simulation Area</h3>
            <div
              id="sim-view"
              style={{
                width: "400px",
                height: "200px",
                backgroundColor: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>No simulation connected</p>
            </div>
            <div id="sim-buttons">
              <button onClick={() => alert("View Angle 1")}>View Angle 1</button>
              <button onClick={() => alert("View Angle 2")}>View Angle 2</button>
            </div>
          </div>

          {/* Blockly Coding Section */}
          <div id="code-editor">
            <h3>Code Editor</h3>
            <BlocklyComponent />
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer>
        <button onClick={() => alert("Going Back")}>Back</button>
      </footer>
    </div>
  );
};

export default App;
