//! Use Nirmeet's utility script to read and write notes
/**
 *  Functions to read, write data using JSON file  
 *  given destination, content, and file
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

// Load node.js fs and util modules
const fs = require('fs');  // work with file system
const util = require('util'); // access utility functions

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Write
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


// Read and write
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };