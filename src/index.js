import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Import global styles (create this file)

// Find the root div in the HTML
const container = document.getElementById('root');
// Create a root and render the App component
const root = createRoot(container);
root.render(<App />); 