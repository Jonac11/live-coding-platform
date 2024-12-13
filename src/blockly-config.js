import * as Blockly from 'blockly';
import 'blockly/python'; // Import Python generator

// Define custom Blockly blocks for RC car control
Blockly.Blocks['move_forward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Move Forward');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('Move the car forward.');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['move_backward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Move Backward');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('Move the car backward.');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['turn_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Turn Left');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('Turn the car left.');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['turn_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Turn Right');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('Turn the car right.');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Stop');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip('Stop the car.');
        this.setHelpUrl('');
    },
};

// Python Generators for each block
Blockly.Python['move_forward'] = function (block) {
    return 'forward(30)\n'; // Adjust speed or parameters as necessary
};

Blockly.Python['move_backward'] = function (block) {
    return 'backward(30)\n'; // Adjust speed or parameters as necessary
};

Blockly.Python['turn_left'] = function (block) {
    return 'turn_left(30)\n'; // Adjust speed or parameters as necessary
};

Blockly.Python['turn_right'] = function (block) {
    return 'turn_right(30)\n'; // Adjust speed or parameters as necessary
};

Blockly.Python['stop'] = function (block) {
    return 'stop()\n';
};

// Configure Blockly toolbox
export const toolbox = `
<xml xmlns="https://developers.google.com/blockly/xml">
    <category name="Movement" colour="120">
        <block type="move_forward"></block>
        <block type="move_backward"></block>
        <block type="turn_left"></block>
        <block type="turn_right"></block>
        <block type="stop"></block>
    </category>
</xml>
`;
