const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Route for blocklyWork.html
app.get('/blockly', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/blocklyWork.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
