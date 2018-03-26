/*
    Simplest possible backend using http-node module
    Running on NodeJS (must be installed)

    Use curl to do HTTP, see curl.txt
*/
'use strict' // Try to eliminate some JS design flaws

var http = require('http'); // Node module

console.log("Starting server at localhost:8080 (127.0.0.1:8080)");
http.createServer(function(request, response) {

    // --- Is alive?
    console.log("Got request for " + request.url);

    // --- Methods
    //console.log(request.method);

    // --- Response status code
    //response.statusCode = 500; // 304, 500

    // --- Request Headers
    console.log(request.headers);

    // --- Response Headers
    //response.setHeader('Allow', 'OPTIONS, DELETE');
    //response.setHeader('Date', new Date());  // JS Date

    // --- Receive data (query string)
    //console.log(request.url.split("?")[1]); // JS built in String function

    // --- Receive data form encoded
    /*var body = []; // JS Array
    request.on("data", function(chunk) { // Single threaded, use callbacks!
        body.push(chunk);
    }).on("end", function() {
        body = Buffer.concat(body).toString();
        console.log(body);
    })*/

    // --- Content type (NOTE: Json is default utf-8)
    //response.setHeader('Content-Type', 'application/json; charset: utf-8');
    //response.setHeader('Content-Type', 'text/html');

    // --- Send data using content type (try in browser also)
    //response.setHeader('Content-Type', 'text/html');
    response.write("<!doctype html><body style='color:blue;'><b>Hello web</b></body>");
    //response.setHeader('Content-Type', 'application/json; charset: utf-8');
    //response.write("{ msg:'Hello web'}");

    // --- Redirect
    /*response.writeHead(303, {
        'Location': 'http://www.example.com/' + request.url
    });*/

    // --- Read a cookies
    //var cookies = parseCookies(request); // Se below
    //console.log(cookies);

    // Write a cookies
    /*response.writeHead(200, {
        'Set-Cookie': 'mycookie=test',
        'Content-Type': 'text/plain'
    });*/

    response.end();

}).listen(8080);

// Utility (no built in support for cookie handling, will come later ...)
function parseCookies(request) {
    var list = {};
    var rc = request.headers.cookie;
    rc && rc.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}
