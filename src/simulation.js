import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Turtle from './turtle';

const Simulation = forwardRef(({ showCamera }, ref) => {
    const [isCameraConnected, setIsCameraConnected] = useState(true);  // checks if camera is connected
    const [key, setKey] = useState(0);  // forces iframe to refresh

    const camUrl = "http://172.20.10.3:9000/mjpg";  // camera feed URL

    const canvasRef = useRef(null);  // reference for the simulation canvas
    const turtleRef = useRef(null);  // reference for the Turtle simulation instance

    // check if the camera feed is available
    const pingCameraFeed = async () => {
        try {
            const response = await fetch(camUrl, { method: "HEAD" });  // checks if the feed is available
            setIsCameraConnected(response.ok);  // updates connection status
        } catch (error) {
            setIsCameraConnected(false);  // if there's an error, set to not connected
        }
    };

    // check camera connection periodically when feed is visible
    useEffect(() => {
        if (!showCamera && canvasRef.current) {
            turtleRef.current = new Turtle(canvasRef.current);
            
            // Ensure the canvas gets updated when switching views
            setTimeout(() => {
                const testCommands = `
                    move_forward(2)
                    turn_right()
                    move_forward(1)
                    turn_left()
                    move_backward(3)
                `;
                turtleRef.current.executeCommands(testCommands);
            }, 500);
        }
    }, [showCamera]);
    

    // initialize the Turtle simulation when switching to simulation view
    useEffect(() => {
        if (!showCamera && canvasRef.current) {
            turtleRef.current = new Turtle(canvasRef.current);
            if (turtleRef.current.clear) { turtleRef.current.clear(); } // Clears the canvas before redrawing
        }
    }, [showCamera]);

    // execute Blockly-generated commands in the simulation
    useImperativeHandle(ref, () => ({
        executeCommands: (commandString) => {
            if (turtleRef.current && !showCamera) {
                turtleRef.current.executeCommands(commandString);
            }
        }
    }));

    return (
        <div id="simulation">
            <h3>Simulation Area</h3>

            <div id="sim-view">
                {showCamera ? (
                    isCameraConnected ? (
                        <>
                            <iframe
                                key={key}  // refresh iframe when key changes
                                src={camUrl}
                                width="640"
                                height="480"
                                onError={() => setIsCameraConnected(false)}  // handle error if feed fails
                            ></iframe>
                        </>
                    ) : (
                        <p>Camera not connected</p>
                    )
                ) : (
                    <canvas
                    ref={canvasRef}  // simulation canvas
                    id="turtleCanvas"
                    width="1300"
                    height="1100"
                    style={{ 
                        border: '3px solid black', 
                        backgroundImage: "url('/images/road.avif')",  
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                    ></canvas>
                )}
            </div>
        </div>
    );
});

export default Simulation;
