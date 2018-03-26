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
var User = require('../models/user.js');
var userreg = require('../models/userregistry.js');

describe('User', function () {
	describe('#equals', function () {
		it('should be equals', function () {
			var u1 = new User("", "", "a");
			var u2 = new User("", "", "a");
			assert.equal(u1.equals(u2), true);
		});
	});
	describe('#equals', function () {
		it('should NOT be equals', function () {
			var u1 = new User("", "", "a");
			var u2 = new User("", "", "b");
			assert.equal(u1.equals(u2), false);
		});
	});
});


describe('UserRegitry', function () {
	describe('#lookup', function () {
		it('should return the default user', function () {
			var user = new User("anon", "anon", "anon@anon");
			var found = userreg.lookup(user);
			assert.equal(user.email, found.email);
			assert.equal(user.name, found.name);
		});
	});
	describe('#register', function () {
		it('register existing user should fail', function () {
			// Another default User
			var user = new User("anon", "anon", "anon@anon");
			assert.equal(userreg.register(user), false);
		});
	});
	describe('#register', function () {
		it('register NON existing user, ok', function () {
			var user = new User("new", "new", "new");
			var size = userreg.size();
			assert.equal(userreg.register(user), true);
			assert.equal(userreg.size(), size + 1);
		});
	});
});