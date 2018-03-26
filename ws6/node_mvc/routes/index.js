/*

    Router for path /

    *** NOTHING TO DO HERE ***

*/


var express = require('express');
var router = express.Router();

// Redirect to application
router.get('/', function(req, res, next) {
    res.redirect('/todo');
});

module.exports = router;
