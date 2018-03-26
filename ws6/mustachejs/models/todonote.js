/*

	A model object in ES5
*/

// private
var counter = 100;

// This is a contructor function
function TodoNote(id, text, date) {
  this.id = (!id) ?
    counter++
    :
    id;
  this.text = (!text) ?
    "empty" :
    text;
  this.dateTime = (!date) ?
    new Date() :
    date;
  this.done = false;
  //console.log(JSON.stringify(this))
};

// Uses NodeJS module system (NOT ES6)
module.exports = TodoNote; // Export contructor (i.e. not an object)
