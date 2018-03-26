/*
	 User registry model object
*/

var User = require('./user.js');

// private with some dummy data
var users = [new User("anon", "anon", "anon@anon")];

// public (a singleton)
module.exports = {
    register: function(user) {
        var u = this.lookup(user);
        if (!u) {
            users.push(user);
            return true;
        } else {
            return false;
        }
    },
    lookup: function(user) {
        var result = users.filter(function(index) {
            return index.equals(user);
        });
        if (result.length === 1) {
            return result[0]
        } else {
            return null;
        }
    },
    size: function() {
        return users.length;
    }
};
