module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);
    var q = require('q');
    mongoose.Promise = q.Promise;

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        updateUser: updateUser,
        updateImage: updateImage
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({
            username: username
        });
    }

    function findUserByCredentials(username, password) {
        return User.findOne({
            username: username,
            password: password
        });
    }

    function updateImage(id, image) {
        return User.findByIdAndUpdate(
            id, {
                profilePic: image
            });
    }

    function updateUser(id, user) {
        return User.findByIdAndUpdate(
            id, {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                companyText: user.companyText
            });
    }

    function deleteUser(userId) {
        return User.remove({
            _id: userId
        });
    }
};
