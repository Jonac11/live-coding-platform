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
      var code = pythonGenerator.workspaceToCode(workspaceRef.current);
      setPythonCode(code);
      console.log('Generated Python Code:\n', code);
      console.log('Log of PythonCode:\n', pythonCode);
      return code;
    }
  };

  // Function to "Run Code" (send to backend server)
  const runCode = async () => {
    var scriptPy = generateCode();

    if (scriptPy) {
      try {
        const response = await fetch('http://172.20.10.3:5001/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: scriptPy,
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
      </div>

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
