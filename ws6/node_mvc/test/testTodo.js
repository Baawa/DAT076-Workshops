/*
    Uses mocha and chai

	npm install -g mocha
	npm install chai

	Must have dir /test for tests

	To run
	$ mocha

	Sadly it seems complicated to debug the tests.
	See models/user.js for simpler approach.

*/
var assert = require('assert');
var TodoNote = require('../models/todonote.js');
var TodoList = require('../models/todolist.js');

describe('TodoNote', function() {
    describe('# Constructor func', function() {
        it('Set default data', function() {
            // Test emulation of overloading
            var n = new TodoNote();
            //console.log(n);
            assert.equal(n.text, "empty");
            var n = new TodoNote(55, "the text");
            assert.equal(n.id, 55);
            //console.log(n);
        });
    });

});

describe('TodoList', function() {
    describe('#getById', function() {
        it('should find dummy data', function() {
            var l = new TodoList();
            // Default dummy data
            var note = l.getById(1);
            assert.equal(note.id, 1);
        });
    });
    describe('#create', function() {
        it('insert a note generated id', function() {
            var l = new TodoList();
            //console.log(todolist.getNotes());
            var size = l.size();
            var note = new TodoNote(null, "newNote");
            l.add(note);
            //console.log(l.getNotes());
            assert.equal(l.size(), size + 1);
            assert.equal(l.getById(note.id).text, "newNote");
        });
        it('insert a note explicit id', function() {
            //console.log(todolist.getNotes());
            var l = new TodoList();
            var note = new TodoNote(99, "newNote");
            //console.log("------------");
            //console.log(note);
            //console.log("------------");
            l.add(note);
            //console.log(l.getNotes());
            var size = l.size();
            l.add(note);
            assert.equal(l.size(), size + 1);
            assert.equal(l.getById(note.id).text, "newNote");
        });
    });

    describe('#update', function() {
        it('update a note (replace it)', function() {
            var l = new TodoList();
            var n = l.getNotes()[0];
            //console.log(n);
            n.text = "updated";
            l.update(n);
            assert.equal(l.getById(n.id).text, "updated");
            assert.equal(l.getById(n.id).dateTime, n.dateTime);
        });
    });
    describe('#delete', function() {
        it('remove note', function() {
            var l = new TodoList();
            var size = l.size();
            l.delete(l.getNotes()[0].id);
            assert.equal(l.size(), size - 1);
        });
    });

});
