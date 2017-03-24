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
