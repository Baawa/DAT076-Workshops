/*
    Model objekt, a user of the site
	  For simple way of debug see below.

*/

// Constructor
function User(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
};

User.prototype = (function() {
    return {
        // emails unique id!
        equals: function(other) {
            return this.email === other.email;
        }
    }

})();

module.exports = User;

/*
	Simple way to debug using node-debug
	Install
	$ npm install -g node-debug

	Run
	node-debug user.js  (will open browser, like Chrome debugger)

	or just run
	$ node models/user.js

*/
/*var test = function () {

	var u1 = new User("", "", "email");
	var u2 = new User("", "", "otheremail");
	var u3 = new User("", "", "email");
	console.log(!u1.equals(u2));
	console.log(u1.equals(u3));

}();*/
