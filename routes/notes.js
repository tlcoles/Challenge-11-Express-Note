const notes = require('express').Router();
const path = require('path')
const dbPath = path.join(__dirname, '../db/db.json')

// Load uuid module
const { v4: uuidv4 } = require('uuid');

// Load read and write functions
const {
  readFromFile,
  readAndAppend,
  writeToFile
} = require('../utils/fsUtils');

// The GET route for retrieving notes
notes.get('/notes', (req, res) => {
    readFromFile(dbPath).then((data) => res.json(JSON.parse(data)));
  });

// The GET route for a specific note
notes.get('/:id', (req, res) => {
    console.log('2');
  const noteId = req.params.id;
  readFromFile(dbPath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// The DELETE route for a specific note
notes.delete('/notes/:id', (req, res) => {
    console.log('3', req.params.id);
  const noteId = req.params.id;
  
  readFromFile(dbPath)
    .then((data) => JSON.parse(data))
    .then((notes) => {
      // Make a new array of all remaining notes
      const result = notes.filter((note) => note.id !== noteId); // fixed with change from notes.id to note.id

      // Save new array
      writeToFile(dbPath, result);

      // Confirm the DELETE request
      res.json(`The note with ID: ${noteId} has been deleted.`);
    });
});


// The POST route for a new note
notes.post('/notes', (req, res) => {
    console.log('4');
  const { title, text } = req.body;
  console.log(req.body);

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4() // this is where the ID is created and assigned
    };

    // Use readAndAppend function to add newNote to db
    readAndAppend(newNote, dbPath);
    res.json('Your note was added!');

  } else {
    res.error('Error! The note was not added.');
  }
});

module.exports = notes;
