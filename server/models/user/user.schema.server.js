module.exports = function() {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        profilePic: Object,
        companyLogo: String,
        companyText: String
    });
    return UserSchema;
};

/*var users = [{
        _id: "123",
        username: "alice",
        password: "alice",
        firstName: "Alice",
        lastName: "Wonder"
    },
    {
        _id: "234",
        username: "bob",
        password: "bob",
        firstName: "Bob",
        lastName: "Marley"
    },
    {
        _id: "345",
        username: "charly",
        password: "charly",
        firstName: "Charly",
        lastName: "Garcia"
    },
    {
        _id: "777",
        username: "tony",
        password: "tony",
        firstName: "Tony",
        lastName: "Stark"
    },
    {
        _id: "888",
        username: "elon",
        password: "elon",
        firstName: "Elon",
        lastName: "Musk"
    }

];*/
