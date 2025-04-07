import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from './blockly_python';
import { definePythonBlocks } from './blockly_python';

const BlocklyComponent = ({ showCamera, executeInSimulation }) => {
  const [pythonCode, setPythonCode] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(null); // Track WebSocket connection status

  const blocklyDivRef = useRef(null); // Reference to the Blockly div
  const workspaceRef = useRef(null);  // Keep track of the Blockly workspace
  const socketRef = useRef(null); // WebSocket reference
  

  useEffect(() => {
    // defining custom blockly blocks
    definePythonBlocks();

    // prevent multiple initializations
    if (!workspaceRef.current) {
      // Inject Blockly workspace
      workspaceRef.current = Blockly.inject(blocklyDivRef.current, {
        toolbox: `
          <xml>
            <category name="Logic">
              <block type="controls_if"></block>
              <block type="logic_compare"></block>
            </category>

            <category name="Loops">
              <block type="controls_repeat_ext"></block>
              <block type="forever_loop"></block>
            </category>

            <category name="Math">
              <block type="math_number"></block>
              <block type="math_arithmetic"></block>
            </category>

            <category name="Car Movement">
              <block type="move_forward"></block>
              <value name="DISTANCE">
                <block type="math_number">
                  <field name="NUM">100</field>
                </block>
              </value>
              
              <block type="move_backward"></block>
                <value name="DISTANCE">
                <block type="math_number">
                  <field name="NUM">100</field>
                </block>
              </value>
              <block type="turn_left"></block>
              <block type="turn_right"></block>
              <block type= "center"></block>
              <block type="stop"></block>
            </category>

            <category name="Sensors">
              <block type="detect_line"></block>
              <block type="line"></block>
              <block type="color_detected"></block>
              <block type="face_detected"></block>
              <block type="obstacle_detected"></block>
              <block type="cliff_detected"></block>
            </category>
          </xml>
        `
      });
    }

    // Cleanup function to dispose of the workspace/websocket connection
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const connectCar = () => {
    const carIp = '192.168.1.118';
    const port = 9090;

    // If a WebSocket connection already exists, close it first
    if (socketRef.current) {
      socketRef.current.close();
      setConnectionStatus('Disconnected');
      console.log('Closed previous connection');
    }

    // Attempt to establish a new WebSocket connection
    socketRef.current = new WebSocket(`ws://${carIp}:${port}`);
    
    socketRef.current.onopen = () => {
      setConnectionStatus('Connected to car!');
      console.log('Successfully connected to car via WebSocket');
    };

    //if error, log
    socketRef.current.onerror = (error) => {
      setConnectionStatus('Failed to connect to car.');
      console.error('WebSocket error:', error);
    };
    
    //receive message from the car's server
    socketRef.current.onmessage = (event) => {
      console.log('Message from server:', event.data);
      alert(`Response from car: ${event.data}`);
    };
    
    //closing connection
    socketRef.current.onclose = () => {
      setConnectionStatus('Connection closed.');
      console.log('WebSocket connection closed');
    };
  };

  // Function to generate Python code
  const generateCode = () => {
    if (workspaceRef.current) {
      var code = pythonGenerator.workspaceToCode(workspaceRef.current);
      setPythonCode(code);
      console.log('Generated Python Code:\n', code);
      console.log('Log of PythonCode:\n', pythonCode);
      return code;
    }
  };

  // Function to "Run Code" (send to backend server)
<<<<<<< HEAD
  const runCode = () => {
    var scriptPy = generateCode();

    if (scriptPy) {
      try {
        
        // Send Python code to WebSocket server
        socketRef.current.send(scriptPy);
        console.log('Sent Python code to WebSocket server:', scriptPy);
        alert('Python code sent successfully to the car!');
      } 
      // error catching
      catch (error) {
        console.error('Error sending code via WebSocket:', error);
        alert('Failed to send code via WebSocket.');
=======
  const runCode = async () => {
    const scriptPy = generateCode();
  
    if (scriptPy) {
      if (!showCamera) { 
        // When in simulation view, run commands locally via the turtle simulation
        executeInSimulation(scriptPy);
      } else {
        // Camera view (actual RC car), send commands to Flask server
        try {
          const response = await fetch('http://172.20.10.3:5001/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: scriptPy,
          });
  
          if (response.ok) {
            const result = await response.json();
            alert(`Code executed successfully:\\n${result.output}`);
          } else {
            alert('Error running code. Check server logs.');
          }
        } catch (error) {
          console.error('Error sending code to server:', error);
          alert('Failed to connect to the server.');
        }
>>>>>>> 3ce47a2149bcb2295c7b4c45e122d85c98aba0f0
      }
    }
  };
  

  const stopCode = () => {
    const stopMessage = "stop()"
    socketRef.current.send(stopMessage);
    console.log('Sent Python code to WebSocket server:', stopMessage);
  }

  return (
    <div className="blockly-workspace">
      <h2>Blockly Workspace</h2>

      {/* Blockly Workspace */}
      <div
        ref={blocklyDivRef}
        id="blocklyDiv"
        className='blockly-div'
      ></div>

      {/* Generate & Run Code Buttons */}
      <div>
        <button onClick={generateCode} className="gen-code">Generate Code</button>
        <button onClick={runCode}>Run Code</button>
        <button onClick={stopCode}>Stop Code</button>
        <button onClick={connectCar}>Connect to Car</button>
      </div>

      {/* Connection Status Feedback */}
      <p>Status: {connectionStatus || 'Not connected'}</p>

      {/* Code Output */}
      <textarea
        className='code-output'
        readOnly
        value={pythonCode}
        placeholder="Generated Python code will appear here..."
      ></textarea>
    </div>
  );
};

export default BlocklyComponent;