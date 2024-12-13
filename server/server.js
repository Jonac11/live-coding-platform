const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware to parse text/plain requests
app.use(express.text());

// Route to handle code upload and execution
app.post('/upload', (req, res) => {
  try {
    // Save the received Python code to a file
    const pythonCode = req.body;
    const filePath = 'uploaded_code.py';

    fs.writeFileSync(filePath, pythonCode);

    // Execute the Python code (make sure Python is installed and accessible)
    exec(`python3 ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python code: ${stderr}`);
        return res.status(500).send(`Execution Error: ${stderr}`);
      }

      console.log(`Python code executed successfully:\n${stdout}`);
      res.send(`Output:\n${stdout}`);
    });
  } catch (error) {
    console.error('Error handling code upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
