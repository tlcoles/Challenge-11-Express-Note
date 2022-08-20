// Create dependencies for express, path, and uuid node modules
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
import { v4 as uuidv4 } from 'uuid';
var id = uuidv4();

// Create middleware to serve static files in /public
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Navigate to public folder'));

// Create HTML route to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Test the port is working
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
