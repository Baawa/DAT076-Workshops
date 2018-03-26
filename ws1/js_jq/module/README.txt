
This is ES6

Tested with Chrome on Linux Mint only!
Chrome Version 61.0.3163.100 (Official Build) (64-bit)
Chrome only accepts 127.0.0.1 (not localhost)

Also using the JQuery API for DOM manipulation (JQuery doesn't
support ES6 module loading, must use <script> tag)

NOTE: Chrome > Dev tools > Network > Disable Cache, will ease you mind!

To run
------
Start hs server in same directory


If other browser
---------------
Firefox 54 – set dom.moduleScripts.enabled setting in about:config.
Edge - ??
Safari - ??

Babel is a transpiler, to transpile ES6 code to ES5. Also need Browserify

$ npm install -g browserify

In directory module (NOTE: there is a .babelrc)

$ npm install       (see package.json for modules to be installed)
$ browserify control.js tablemodule.js  -t babelify -o bundle.js

Uncomment in index.html and run hs. Or even better install
watchify (which will run browerify)

$ npm install -g watchify

$ watchify control.js tablemodule.js  -t babelify -o bundle.js -v
(still have to reload page)

Output from watchify should look like:
7521 bytes written to bundle.js (0.36 seconds) at 09:17:37
7521 bytes written to bundle.js (0.05 seconds) at 09:22:01
...
