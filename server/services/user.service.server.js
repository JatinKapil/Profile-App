module.exports = function(app, models, multer, fs) {

    var passport = require('passport');
    var auth = authorized;
    var userModel = models.userModel;

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));



    //app.post('/api/login', passport.authenticate('local'), login);
    //app.post('/api/logout', logout);
    //app.post('/api/register', register);
    //app.post('/api/user', auth, createUser);

    //app.get('/api/user', auth, findAllUsers);
    app.put('/api/user', updateUser);
    app.delete('/api/user/:id', auth, deleteUser);

    //passport.authenticate('local')
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);

    app.get('/api/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });


    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        var stats = userModel
            .findUserByCredentials({
                username: username,
                password: password
            });
        if (stats.user._id) {
            return done(null, false);
        } else if (stats.user) {
            return done(null, user);
        } else {
            return done(err);
        }


    }
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    /*  function login(req, res) {
          var user = req.user;
          res.json(user);
      }

      function logout(req, res) {
          req.logOut();
          res.send(200);
      }

      */

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


    //file uploads
    var upload = multer({
        dest: __dirname + '/../uploads'
    });
    app.post('/api/upload', upload.single('file'), uploadImage);

    function uploadImage(req, res) {
        console.log(req.body);
        console.log(req.file);
        var image = {
            "originalname": req.file.originalname,
            "size": req.file.size,
            "dataUrl": new Buffer(fs.readFileSync(req.file.path)).toString("base64"),
            "mimetype": req.file.mimetype
        };
        var stats = userModel.updateImage(req.body.userId, image);
        if (stats && res !== null) res.statusCode(200);
        else return null;
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel.createUser(newUser)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.body._id;
        var user = req.body;
        var stats = userModel.updateUser(id, user);
        if (stats && res !== null) res.statusCode(200);
        else return null;
    }


    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log(username + " - " + password);
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.statusCode(404);
        }
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        userModel.findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findUserByCredentials(username, password, res) {
        userModel.findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findUserByUsername(username, res) {
        userModel.findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteUser() {}
};
