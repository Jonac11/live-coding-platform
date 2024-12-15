import React, { useEffect, useState } from 'react';
import * as Blockly from 'blockly';
import { pythonGenerator } from './blockly_python';
import { definePythonBlocks } from './blockly_python';

const BlocklyComponent = () => {
  const [pythonCode, setPythonCode] = useState('');

  useEffect(() => {
    // Define custom blocks
    definePythonBlocks();

    // Inject Blockly workspace
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: `
        <xml>
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

    // Generate Python code
    window.generateCode = () => {
      const code = pythonGenerator.workspaceToCode(workspace);
      setPythonCode(code);
      console.log('Generated Python Code:\n', code);
    };
  }, []);

  return (
    <div>
      <h2>Blockly Workspace</h2>
      <div id="blocklyDiv" style={{ height: '400px', width: '600px' }}></div>
      <button onClick={() => window.generateCode()}>Generate Code</button>
      <textarea
        readOnly
        value={pythonCode}
        style={{ width: '100%', height: '150px', marginTop: '20px' }}
      ></textarea>
    </div>
  );
};

export default BlocklyComponent;
