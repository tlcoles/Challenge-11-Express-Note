// Require express, path, and uuid node modules
const { Console } = require('console'); 
const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

// Set the app variable
const app = express();

//! Do I need this next line?
const data = require('./db/db.json');

// Sets up express middleware to handle incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// The GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// The GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);

// plug in the API router from ./routes/notes.js under the `/api` path
app.use('/api', api)

// Wildcard route to direct users to homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test the port is working
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
