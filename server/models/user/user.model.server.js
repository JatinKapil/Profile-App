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
        User.findByIdAndUpdate(
            id, {
                profilePic: image
            }, {

            },
            function(error, raw) {
                if (error) return handleError(error);
                else {
                    console.log('The raw response from Mongo received');
                    return raw;
                }
            });
    }

    function updateUser(id, user) {
        User.findByIdAndUpdate(
            id, {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                companyText: user.companyText
            }, {

            },
            function(error, raw) {
                if (error) return handleError(error);
                else {
                    console.log('The raw response from Mongo was received');
                    return raw;
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({
            _id: userId
        });
    }
};
