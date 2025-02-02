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
                <button onClick={() => alert("View Angle 1")}>View Angle 1</button>
                <button onClick={() => alert("View Angle 2")}>View Angle 2</button>
            </div>
            
        </div>
    );
};

export default Simulation;
