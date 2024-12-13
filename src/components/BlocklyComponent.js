import React, { useEffect, useState } from 'react';
import * as Blockly from 'blockly';
import 'blockly/python';

const BlocklyComponent = () => {
  const [pythonCode, setPythonCode] = useState(''); // Store generated Python code
  const [textInput, setTextInput] = useState(''); // Store text-based input

  useEffect(() => {
    const initBlockly = () => {
      // Define custom Blockly blocks
      Blockly.Blocks['move_forward'] = {
        init: function () {
          this.appendDummyInput().appendField('Move Forward');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(100);
        },
      };

      Blockly.Blocks['move_backward'] = {
        init: function () {
          this.appendDummyInput().appendField('Move Backward');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(100);
        },
      };

      Blockly.Blocks['turn_left'] = {
        init: function () {
          this.appendDummyInput().appendField('Turn Left');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(70);
        },
      };

      Blockly.Blocks['turn_right'] = {
        init: function () {
          this.appendDummyInput().appendField('Turn Right');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(70);
        },
      };

      Blockly.Blocks['stop'] = {
        init: function () {
          this.appendDummyInput().appendField('Stop');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(0);
        },
      };

      // Python generators
      if (Blockly.Python) {
        Blockly.Python['move_forward'] = () => 'px.forward(30)\ntime.sleep(1)\n';
        Blockly.Python['move_backward'] = () => 'px.backward(30)\ntime.sleep(1)\n';
        Blockly.Python['turn_left'] = () => 'px.set_dir_servo_angle(-35)\ntime.sleep(0.01)\n';
        Blockly.Python['turn_right'] = () => 'px.set_dir_servo_angle(35)\ntime.sleep(0.01)\n';
        Blockly.Python['stop'] = () => 'px.stop()\n';
      }

      // Initialize Blockly workspace
      Blockly.inject('blocklyDiv', {
        toolbox: `
          <xml xmlns="https://developers.google.com/blockly/xml">
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
        <category name="Text">
          <block type="text"></block>
        </category>
        <category name="Car Movement">
          <block type="move_forward"></block>
          <block type="move_backward"></block>
          <block type="turn_left"></block>
          <block type="turn_right"></block>
          <block type = "stop"></block>
        </category>
          </xml>
        `,
      });
    };

    initBlockly();
  }, []);

  const generateCode = () => {
    const code = Blockly.Python.workspaceToCode();
    setPythonCode(code);
  };

  const handleTextSubmit = () => {
    // Store the user's text input as Python code
    setPythonCode(textInput);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Code Editor</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Blockly Workspace */}
        <div id="blocklyDiv" style={{ height: '400px', width: '50%' }}></div>

        {/* Text-based Input */}
        <div style={{ width: '50%' }}>
          <h3>Text-Based Input</h3>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Write Python code here..."
            style={{ width: '100%', height: '150px' }}
          ></textarea>
          <button onClick={handleTextSubmit} style={{ marginTop: '10px' }}>
            Submit Code
          </button>
        </div>
      </div>

      {/* Generated Code Display */}
      <textarea
        readOnly
        value={pythonCode}
        placeholder="Generated Python code will appear here..."
        style={{ width: '100%', height: '100px', marginTop: '10px' }}
      ></textarea>
      <button onClick={generateCode}>Generate Code from Blocks</button>
    </div>
  );
};

export default BlocklyComponent;
