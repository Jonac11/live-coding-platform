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
      this.setTooltip('Move forward at speed of 30');
    },
  };

  Blockly.Blocks['move_backward'] = {
    init: function () {
      this.appendDummyInput().appendField('Move Backward');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(100);
      this.setTooltip('Move backward at speed of 30');
    },
  };

  Blockly.Blocks['turn_left'] = {
    init: function () {
      this.appendDummyInput().appendField('Turn Left');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(70);
      this.setTooltip('Turn left at angle of -35');
    },
  };

  Blockly.Blocks['turn_right'] = {
    init: function () {
      this.appendDummyInput().appendField('Turn Right');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(70);
      this.setTooltip('Turn right at angle of 35');
    },
  };

  Blockly.Blocks['stop'] = {
    init: function () {
      this.appendDummyInput().appendField('Stop');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('Stop Car');
    },
  };

  Blockly.Blocks['forever_loop'] = {
    init: function () {
      this.appendDummyInput().appendField('For Forever');
      this.appendStatementInput('DO').setCheck(null).appendField('do');
      this.setColour(120);
      this.setTooltip('Infinite loop that repeatedly executes the "do" section.');
    },
  };

  Blockly.Blocks['detect_line'] = {
    init: function () {
      this.appendDummyInput().appendField('Detect Line');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(280);
      this.setTooltip('Detect a line');
    },
  };

  Blockly.Blocks['color_detected'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Color Detected:')
        .appendField(
          new Blockly.FieldDropdown([
            ['Red', '"red"'],
            ['Orange', '"orange"'],
            ['Yellow', '"yellow"'],
            ['Green', '"green"'],
            ['Blue', '"blue"'],
            ['Purple', '"purple"'],
          ]),
          'COLOR'
        );
      this.setOutput(true, 'Boolean');
      this.setColour(280);
      this.setTooltip('Checks if the specified color is detected.');
    },
  };

  Blockly.Blocks['line'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Line is')
        .appendField(
          new Blockly.FieldDropdown([
            ['Ahead', '"forward"'],
            ['Right', '"right"'],
            ['Left', '"left"'],
            ['Absent', '"stop"'],
          ]),
          'STATE'
        );
      this.setOutput(true, 'Boolean');
      this.setColour(280);
      this.setTooltip('Checks if the specified line is detected.');
    },
  };

  Blockly.Blocks['follow_color'] = {
    init: function () {
      this.appendDummyInput().appendField('Follow Color');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip('Follow the specified color');
    },
  };

  Blockly.Blocks['follow_line'] = {
    init: function () {
      this.appendDummyInput().appendField('Follow Line');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip('Follow the detected line');
    },
  };

  Blockly.Blocks['follow_camera'] = {
    init: function () {
      this.appendDummyInput().appendField('Follow with Camera');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(45);
      this.setTooltip('Follow using the camera');
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

  pythonGenerator.forBlock['delay'] = function () {
    return 'time.sleep(0.5)\n';
  };

  pythonGenerator.forBlock['color_detected'] = function (block) {
    const dropdownColor = block.getFieldValue('COLOR');
    return [`detect_color(${dropdownColor})`, pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['line'] = function (block) {
    const dropdownState = block.getFieldValue('STATE');
    return [`gm_state == ${dropdownState}`, pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['follow_color'] = function () {
    return 'followColor()\n';
  };

  pythonGenerator.forBlock['follow_line'] = function () {
    return 'followLine()\n';
  };

  pythonGenerator.forBlock['follow_camera'] = function () {
    return 'followCamera()\n';
  };

  pythonGenerator.forBlock['detect_line'] = function () {
    return 'gm_val_list = px.get_grayscale_data()\ngm_state = get_status(gm_val_list)\n';
  };

  pythonGenerator.forBlock['forever_loop'] = function (block) {
    const statementsDo = pythonGenerator.statementToCode(block, 'DO');
    return `while True:\n${statementsDo}`;
  };
};

// Export the Python generator for use in other files
export { pythonGenerator };
