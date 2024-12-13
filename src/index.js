import { createRoot } from 'react-dom/client'; // For React 18+
import React from 'react'; // Core React library
import App from './App'; // Import your App component
import './styles.css'; // Import global styles (optional)

const container = document.getElementById('root'); // Target the root div in index.html
const root = createRoot(container); // Create React root for rendering

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
