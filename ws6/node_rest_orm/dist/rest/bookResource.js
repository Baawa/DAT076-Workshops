"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookResource = undefined;

var _express = require("express");

var _book = require("../entity/book");

/*
    Endpoint for url http://localhost:8080/api/authors
*/
var bookResource = exports.bookResource = function bookResource(_ref) {
  var config = _ref.config,
      db = _ref.db;

  var router = new _express.Router();

  // URL: localhost:8080/api/authors
  router.get('/', function (req, res, next) {
    db.getRepository(_book.Book).find().then(function (result) {
      res.json(result);
    });
  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/authors/count
  router.get('/count', function (req, res, next) {
    //console.log("GET: count (size)");
    db.getRepository(_book.Book).createQueryBuilder("book").select("COUNT(book.isbn)", "count").getRawOne().then(function (count) {
      res.json(count);
    });
  });

  // URL: localhost:8080/api/authors/FF
  router.get('/:isbn', function (req, res, next) {
    //console.log(req.body);
    db.getRepository(_book.Book).findOneById(req.params['isbn']).then(function (found) {
      res.json(found);
    });
  });

  router.post('/', function (req, res, next) {
    //console.log(req.body);
    db.getRepository(_book.Book).save(req.body).then(function () {
      res.status(201).send();
    });
  });

  //update
  router.post('/edit', function (req, res, next) {
    db.getRepository(_book.Book).save(req.body).then(function () {
      res.status(201).send();
    });
  });

  //delete
  router.delete('/:isbn', function (req, res, next) {
    db.getRepository(_book.Book).findOneById(req.params['isbn']).then(function (found) {
      db.getRepository(_book.Book).delete(found).then(function () {
        res.status(201).send();
      });
    });
  });

  return router;
};