import React, { useEffect } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/python';

const BlocklyComponent = () => {
    useEffect(() => {
        const workspace = Blockly.inject('blocklyDiv', {
            toolbox: `
            <xml>
                <category name="Movement">
                    <block type="move_forward"></block>
                    <block type="move_backward"></block>
                    <block type="turn_left"></block>
                    <block type="turn_right"></block>
                    <block type="stop"></block>
                </category>
            </xml>
            `,
        });

        window.runCode = () => {
            try {
                const pythonCode = Blockly.Python.workspaceToCode(workspace); // Generate Python code
                console.log(pythonCode); // Log the Python code to the console
                alert('Generated Python Code:\n' + pythonCode);
            } catch (error) {
                console.error('Error generating Python code:', error.message);
                alert('Error generating Python code: ' + error.message);
            }
        };
        
    }, []);

    return (
        <div>
            <div id="blocklyDiv" style={{ height: '480px', width: '100%' }}></div>
            <button onClick={() => window.runCode()}>Run Code</button>
        </div>
    );
};

export default BlocklyComponent;
