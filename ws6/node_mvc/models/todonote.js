/*

	A model object

	NOTE: Recommended using function Foo() { ... }
	for constructors instead of var Foo = function() { ... }.
	The main benefit is that you get better stack traces from Node
	when you use a named function.
*/

// private static
var counter = 100;

// Contructor (kind of overloaded)
function TodoNote(id, text, date, done) {
    this.id = (!id)
        ? counter++
        : id;
    this.text = (!text)
        ? "empty"
        : text;
    this.dateTime = (!date)
        ? new Date()
        : date;
    this.done = (!done)
        ? false
        : done;
};

module.exports = TodoNote;

/*
	Simple way to debug using node-debug
	Install
	$ npm install -g node-debug

	Run
	node-debug user.js  (will open browser, like Chrome debugger)

*/
/*
var test = function () {
	var n = new TodoNote("new", "", 1);
	console.log(n);
}();
*/
