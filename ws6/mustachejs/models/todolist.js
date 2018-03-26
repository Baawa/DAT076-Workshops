/*
	Todolist model object
*/
// Uses NodeJS module system (NOT ES6)
var TodoNote = require('./todonote.js');

// private with some dummy data
var notes = [
  new TodoNote(1, 'Äta gröt'),
  new TodoNote(2, 'Rensa sallad'),
  new TodoNote(3, 'Jaga älg')
];

// private
function find(id) {
  var result = notes.filter(function(v) {
    return v.id === id; // Filter out the appropriate one
  });
  return result[0];
}

// public (a singleton)
module.exports = {
  getNotes: function() {
    return notes;
  },
  getById: function(id) {
    return find(id);
  }
};
