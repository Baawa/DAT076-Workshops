"use strict";

var _typeorm = require("typeorm");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _author = require("./entity/author");

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authorResource = require("./rest/authorResource");

var _bookResource = require("./rest/bookResource");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  "port": 8080,
  "bodyLimit": "100kb",
  "corsHeaders": ["Link"]
};

var app = (0, _express2.default)();

// 3rd party middleware
app.use((0, _cors2.default)({
  exposedHeaders: config.corsHeaders
}));

app.use(_bodyParser2.default.json({
  limit: config.bodyLimit
}));

// Try connect to db
(0, _typeorm.createConnection)().then(function (db) {

  // During development, check if database ok
  /*db.getRepository(Author)
    .find()
    .then(result => {
      console.log(result);
    });
  */

  // Map url to resource and send params.
  app.use('/authors', (0, _authorResource.authorResource)({
    config: config,
    db: db
  }));

  app.use('/books', (0, _bookResource.bookResource)({
    config: config,
    db: db
  }));

  app.listen(8080, function () {
    console.log("Started on 127.0.0.1:8080");
  });
}).catch(function (error) {
  return console.log("Error: ", error);
});