module.exports = function() {

    var mongoose = require('mongoose');
    var UserSchema = require("./user/user.schema.server.js")();

    mongoose.connect('mongodb://localhost/ProfileApp');

    var models = {
        userModel: require("./user/user.model.server")()
        // the userModel contains the api
    };
    return models;
};
