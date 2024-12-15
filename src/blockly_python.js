import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python'; // Correctly import the Python generator

/**
 * Define custom Blockly blocks and Python generators
 */
export const definePythonBlocks = () => {
  if (!Blockly || !Blockly.Blocks) {
    console.error('Blockly is undefined. Ensure Blockly is correctly loaded.');
    return;
  }

  // Custom Blocks
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

  // Python Generators
  pythonGenerator.forBlock['move_forward'] = function () {
    return 'px.forward(30)\ntime.sleep(1)\n';
  };

  pythonGenerator.forBlock['move_backward'] = function () {
    return 'px.backward(30)\ntime.sleep(1)\n';
  };

  pythonGenerator.forBlock['turn_left'] = function () {
    return 'px.set_dir_servo_angle(-35)\ntime.sleep(0.01)\n';
  };

  pythonGenerator.forBlock['turn_right'] = function () {
    return 'px.set_dir_servo_angle(35)\ntime.sleep(0.01)\n';
  };

  pythonGenerator.forBlock['stop'] = function () {
    return 'px.stop()\n';
  };
};

// Export the Python generator for use in BlocklyComponent.js
export { pythonGenerator };
