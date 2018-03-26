/*

  In-house server to demonstrate Mustache templating
  This is ES5!

  To run
  $ node app.js   (or $ nodemon)

  Visit localhost:8080

*/
// Using nodes module system
var http = require('http');
var fs = require('fs');
var Mustache = require('mustache');
var todoList = require('./models/todolist.js');

// Use node filesystem module (just for this demo).
var header = fs.readFileSync("partials/header.html", "utf-8");
var footer = fs.readFileSync("partials/footer.html", "utf-8");

http.createServer(function(request, response) {

  console.log(request.url);

  if (request.url.match(".css")) {
    fs.readFile("css/default.css", 'utf-8', function(error, source) {
      doResponse(response, source, "text/css");
    });
  } else if (request.url.match("details")) {
    var id = request.url.split("=")[1].trim();
    var note = todoList.getById(parseInt(id));
    fs.readFile('details.html', 'utf-8', function(error, source) {
      // Convert template to HTML (fill in dynaimic data)
      var html = Mustache.to_html(source, {
        note: note
      }, {
        header: header,
        footer: footer
      });
      doResponse(response, html, "text/html");
    });
  } else {
    fs.readFile('index.html', 'utf-8', function(error, source) {
      // Convert template to HTML (fill in dynaimic data)
      var html = Mustache.to_html(source, {
        todoList: todoList.getNotes()
      }, {
        header: header,
        footer: footer
      });
      doResponse(response, html, "text/html");
    });
  };
}).listen(8080);
console.log("Server started at 8080");

// Utility
function doResponse(response, source, type) {
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': source.length
  });
  response.write(source);
  response.end();
}
