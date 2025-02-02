import React from "react";
import BlocklyComponent from "./BlocklyComponent";
import Simulation from "./simulation";
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
          <Simulation />
          <BlocklyComponent />
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
