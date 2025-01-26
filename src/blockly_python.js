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

  Blockly.Blocks['delay'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Delay");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip("Stop Car");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['stop'] = {
    init: function () {
      this.appendDummyInput().appendField('Stop');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
    },
  };




  Blockly.Blocks['color_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Color Detected")
          .appendField(new Blockly.FieldDropdown([["Red", '"red"'],["Orange", '"orange"'],["Yellow", '"yellow"'], ["Green", '"green"'], ["Blue", '"blue"'],["Purple", '"purple"']]), "COLOR");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Checks if the specified color is detected.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['face_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Face Detected");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Checks if a face is detected.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['obstacle_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Obstacle Detected");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Checks if a face is detected.");
      this.setHelpUrl("");
    }
  };


  Blockly.Blocks['cliff_detected'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Cliff Detected");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Checks if a face is detected.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['detect_line'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Detect Line");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(280);
      this.setTooltip("Stop Car");
      this.setHelpUrl("");
    }
  };
    
  Blockly.Blocks['line'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Line is")
          .appendField(new Blockly.FieldDropdown([["Ahead", '"forward"'],["Right", '"right"'],["Left", '"left"'], ["Absent", '"stop"']]), "STATE");
      this.setOutput(true, "Boolean");
      this.setColour(280);
      this.setTooltip("Checks if the specified color is detected.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['forever_loop'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("For Forever");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setColour(120);
    this.setTooltip("Infinite loop that repeatedly executes the 'do' section.");
    this.setHelpUrl("");
  }
};





  // Python Generators
  pythonGenerator.forBlock['move_forward'] = function () {
    return 'px.set_dir_servo_angle(0)\npx.forward(10)\n';
  };

  pythonGenerator.forBlock['move_backward'] = function () {
    return 'px.backward(10)\n';
  };

  pythonGenerator.forBlock['turn_left'] = function () {
    return 'px.set_dir_servo_angle(-20)\npx.forward(10)\n';
  };

  pythonGenerator.forBlock['turn_right'] = function () {
    return 'px.set_dir_servo_angle(20)\npx.forward(10)\n';
  };

  pythonGenerator.forBlock['stop'] = function () {
    return 'px.stop()\n';
  };


  pythonGenerator.forBlock['color_detected'] = function(block) {
    var dropdown_color = block.getFieldValue('COLOR');
    return ['detect_color(' + dropdown_color + ')', Blockly.Python.ORDER_ATOMIC];
  };
  
  pythonGenerator.forBlock['line'] = function(block) {
    var dropdown_state = block.getFieldValue('STATE');
    return ['gm_state == ' + dropdown_state, Blockly.Python.ORDER_ATOMIC];
  };
  
  pythonGenerator.forBlock['face_detected'] = function() {
    return ['detect_face()', Blockly.Python.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock['obstacle_detected'] = function() {
    return ['detect_obstacle()', Blockly.Python.ORDER_ATOMIC];
  };
  
  pythonGenerator.forBlock['cliff_detected'] = function() {
    return ['detect_cliff()', Blockly.Python.ORDER_ATOMIC];
  };
  
  pythonGenerator.forBlock['detect_line'] = function() {
    return ['gm_val_list = px.get_grayscale_data()\ngm_state = get_status(gm_val_list)', Blockly.Python.ORDER_ATOMIC];
  };
  
  pythonGenerator.forBlock['forever_loop'] = function(block) {
    var statements_do = pythonGenerator.statementToCode(block, 'DO');
    return 'while True:\n' + statements_do;
  };

  
};






// Export the Python generator for use in BlocklyComponent.js
export { pythonGenerator };
