# README

This is an ES6 "in-house MVC" client application running in the browser
(reason for in-house: Any framework too complex)
The view layer (HTML) uses "Datatables" (jqueryPlugin). Lots of
functionality built in. Possible have to explore a bit.

#Install
Run npm install in es6_client dir .. THEN .. copy
files to dist (this is already done but mentioned here for the project)

Tested on Chrome 61.0.3163.100 if other browser possibly need
watchify/browserify/babelify

Note stages (there are comment in code)
Stage 1: Pure client side using had coded database, see constructor
AuthorRegistry.
Stage 2: Add Ajax/REST to get data from back-end/database
The back-end should run a REST service for the library database (OO model
of database like the one from previous workshop)

## Client side libraries
- All libraries are installed in node_modules using npm, see package.json
- Files used are copied from node_modules to /dist directory so you
  really don't need to do npm install
- Uses jQuery for AJAX calls ($.ajax(...))
- Uses jQuery DOM API

## To run client side only
- Start hs in es6_client directory
- Visit localhost:8080

## To run with back-end
- Open terminal: $  {payara install dir}/bin/asadmin start-domain domain1
- Open other terminal (in es6_client):  hs
NOTE: Start back-end first, will use port 8080, then front-end using 8081
else port conflict

# Problems with browser and ES6
- Install watchify (see workshop 1)
- Run below and adjust in html pages

Run (NOTE: order of js files matter, dependencies)
watchify service/*.js model/*.js view/*.js control/*.js -t babelify -o dist/bundle.js -v
