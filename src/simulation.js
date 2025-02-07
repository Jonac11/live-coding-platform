// Simulation.js
import React from 'react';

const Simulation = () => {
    return (
        <div id="simulation">
            <h3>Simulation Area</h3>

            <div id="sim-view">
                <p>No simulation connected</p>
            </div>

            <div id="sim-buttons">
                <button onClick={() => alert("View Angle 1")}>Simulation</button>
                <button onClick={() => alert("View Angle 2")}>Vizualizer</button>
            </div>
            
        </div>
    );
};

export default Simulation;
