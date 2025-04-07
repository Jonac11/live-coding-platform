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
      this.appendValueInput("DISTANCE").setCheck("Number").appendField('Move Forward');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(100);
      this.setTooltip('Move forward by selected number of feet. If no input, move forward continously');
    },
  };

  Blockly.Blocks['move_backward'] = {
    init: function () {
      this.appendValueInput("DISTANCE").setCheck("Number").appendField('Move Backward');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(100);
      this.setTooltip('Move backward by selected number of feet. If no input, move backward continously');
    },
  };

  Blockly.Blocks['turn_left'] = {
    init: function () {
      this.appendDummyInput().appendField('Turn Left');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(70);
      this.setTooltip('Turn left at an angle of 20°');
    },
  };

  Blockly.Blocks['turn_right'] = {
    init: function () {
      this.appendDummyInput().appendField('Turn Right');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(70);
      this.setTooltip('Turn right at an angle of 20°');
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
  Blockly.Blocks['center'] = {
    init: function () {
      this.appendDummyInput().appendField('Center');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(70);
      this.setTooltip('Turns car to face the center');
    },
  };

  Blockly.Blocks['forever_loop'] = {
    init: function () {
      this.appendDummyInput().appendField('For Forever');
      this.appendStatementInput('DO').setCheck(null).appendField('do');
      this.setColour(120);
      this.setTooltip('Infinite loop that repeatedly executes the "do" section');
    },
  };

  Blockly.Blocks['detect_line'] = {
    init: function () {
      this.appendDummyInput().appendField('Detect Line');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(280);
      this.setTooltip('Detects a line');
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
      this.setTooltip('Returns True if the specified color is detected');
    },
  };

  Blockly.Blocks['line'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Car is')
        .appendField(
          new Blockly.FieldDropdown([
            ['On Line', '"forward"'],
            ['Left of Line', '"right"'],
            ['Right of Line', '"left"'],
            ['Off Line', '"stop"'],
          ]),
          'STATE'
        );
      this.setOutput(true, 'Boolean');
      this.setColour(280);
      this.setTooltip('Returns True if car is at the specified position');
    },
  };

  Blockly.Blocks['face_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Face Detected");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Returns True if a face is detected");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['obstacle_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Obstacle Detected");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Returns True if an obstacle is detected");
      this.setHelpUrl("");
    }
  };


  Blockly.Blocks['cliff_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Cliff Detected");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Returns True if a cliff is detected");
      this.setHelpUrl("");
    }
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
  pythonGenerator.forBlock['move_forward'] = function (block) {
    const distanceBlock = block.getInputTargetBlock('DISTANCE');
    const dist = distanceBlock ? distanceBlock.getFieldValue('NUM') : 0;
    return `move_forward(${dist})\n`;
  };

  pythonGenerator.forBlock['move_backward'] = function (block) {
    const distanceBlock = block.getInputTargetBlock('DISTANCE');
    const dist = distanceBlock ? distanceBlock.getFieldValue('NUM') : 0;
    return `move_backward(${dist})\n`;
  };

  pythonGenerator.forBlock['turn_left'] = function () {
    return 'turn_left()\n';
  };

  pythonGenerator.forBlock['turn_right'] = function () {
    return 'turn_right()\n';
  };

  pythonGenerator.forBlock['stop'] = function () {
    return 'stop()\n';
  };

  pythonGenerator.forBlock['center'] = function () {
    return 'center()\n';
  };

  pythonGenerator.forBlock['delay'] = function () {
    return 'delay()\n';
  };

  pythonGenerator.forBlock['color_detected'] = function (block) {
    const dropdownColor = block.getFieldValue('COLOR');
    return [`detect_color(${dropdownColor})`, pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['line'] = function (block) {
    const dropdownState = block.getFieldValue('STATE');
    return [`gm_state == ${dropdownState}`, pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['face_detected'] = function () {
    return ['detect_face()', pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['cliff_detected'] = function () {
    return ['detect_cliff()', pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['obstacle_detected'] = function () {
    return ['detect_obstacle()', pythonGenerator.ORDER_ATOMIC];
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
    return 'detect_line()\n';
  };

  pythonGenerator.forBlock['forever_loop'] = function (block) {
    const statementsDo = pythonGenerator.statementToCode(block, 'DO');
    return `while True:\n${statementsDo}`;
  };
};

// Export the Python generator for use in other files
export { pythonGenerator };
