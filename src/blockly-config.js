// Blockly Workspace Initialization
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: {
      kind: 'flyoutToolbox',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'text' }
      ]
    }
  });
  
  // Simulation View Switching
  function changeView(view) {
    const simView = document.getElementById('sim-view');
    if (view === 'angle1') {
      simView.innerHTML = '<p>Simulation View: Angle 1</p>';
      simView.style.backgroundColor = '#a2d5c6'; // Example color change for view
    } else if (view === 'angle2') {
      simView.innerHTML = '<p>Simulation View: Angle 2</p>';
      simView.style.backgroundColor = '#f9c74f'; // Example color change for view
    }
  }
  
  // Run Blockly Code
  function runCode() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log('Generated Code:', code);
    // Add your integration logic here to send the code to the simulator
  }
  