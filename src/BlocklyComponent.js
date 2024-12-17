import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from './blockly_python';
import { definePythonBlocks } from './blockly_python';

const BlocklyComponent = () => {
  const [pythonCode, setPythonCode] = useState('');
  const blocklyDivRef = useRef(null); // Reference to the Blockly div
  const workspaceRef = useRef(null);  // Keep track of the Blockly workspace

  useEffect(() => {
    // Define custom blocks only once
    definePythonBlocks();

    // Prevent multiple initializations
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
            </category>
            <category name="Math">
              <block type="math_number"></block>
              <block type="math_arithmetic"></block>
            </category>
            <category name="Car Movement">
              <block type="move_forward"></block>
              <block type="move_backward"></block>
              <block type="turn_left"></block>
              <block type="turn_right"></block>
              <block type="stop"></block>
            </category>
          </xml>
        `,
      });
    }

    // Cleanup function to dispose of the workspace
    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  // Function to generate Python code
  const generateCode = () => {
    if (workspaceRef.current) {
      const code = pythonGenerator.workspaceToCode(workspaceRef.current);
      setPythonCode(code);
      console.log('Generated Python Code:\n', code);
    }
  };

  // Function to "Run Code" (send to backend server)
  const runCode = async () => {
    if (pythonCode) {
      try {
        const response = await fetch('http://192.168.1.100:5000/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: pythonCode,
        });

        if (response.ok) {
          const result = await response.json();
          alert(`Code executed successfully:\n${result.output}`);
        } else {
          alert('Error running code. Check server logs.');
        }
      } catch (error) {
        console.error('Error sending code to server:', error);
        alert('Failed to connect to the server.');
      }
    } else {
      alert('No code generated. Please generate code first!');
    }
  };

  return (
    <div>
      <h2>Blockly Workspace</h2>

      {/* Blockly Workspace */}
      <div
        ref={blocklyDivRef}
        id="blocklyDiv"
        style={{ height: '400px', width: '100%' }}
      ></div>

      {/* Buttons */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={generateCode} style={{ marginRight: '10px' }}>
          Generate Code
        </button>
        <button onClick={runCode}>Run Code</button>
      </div>

      {/* Python Code Display */}
      <textarea
        readOnly
        value={pythonCode}
        placeholder="Generated Python code will appear here..."
        style={{ width: '100%', height: '150px', marginTop: '20px' }}
      ></textarea>
    </div>
  );
};

export default BlocklyComponent;
