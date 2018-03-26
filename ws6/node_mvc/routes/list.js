/*

    Teh router for all /list/* pathes


    NOTE:  Order of pathes IMPORTANT
    Express will try to match top down
    If something before matches, .... then what should match NOT executed.
*/

var express = require('express');
var TodoNote = require('../models/todonote.js');
var TodoList = require('../models/todolist.js');

var todolist = new TodoList();
var router = express.Router();

// List notes for current user
router.get('/', function(req, res, next) {
    console.log("GET list " + req.query.id);
    if (req.query.id) {
        res.render('details', {
            note: todolist.getById(parseInt(req.query.id))
        });
    } else {
        res.render('list', {
            title: 'List', //JSON.stringify(list.getNotes()),
            todolist: todolist.getNotes()
        });
    }
});

router.get('/add', function(req, res, next) {
    console.log("Get add");
    res.render('add');
});

// Ok, works here
router.post('/add', function(req, res, next) {
    console.log("Post add" + req.body.text);
    todolist.add(new TodoNote(null, req.body.text));
    res.redirect("/todo/list");
});

router.get('/delete', function(req, res, next) {
    console.log("Get delete");
    console.log(todolist.getById(parseInt(req.query.id)));
    res.render('delete', {
        title: 'Delete Note',
        note: todolist.getById(parseInt(req.query.id))
    });
});

router.post('/delete', function(req, res, next) {
    console.log("Post delete " + req.body.id);
    todolist.delete(parseInt(req.body.id));
    res.redirect("/todo/list");
});

router.get('/edit', function(req, res, next) {
    console.log("Get edit");
    //console.log(todolist.getById(parseInt(req.params.id)));
    res.render('edit', {
        title: 'Edit Note',
        note: todolist.getById(parseInt(req.query.id))
    });
});

router.post('/edit', function(req, res, next) {
    console.log("Post edit " + req.body.id);
    var note = new TodoNote(parseInt(req.body.id), req.body.text);
    todolist.update(note);
    res.redirect("/todo/list");
});

module.exports = router;
