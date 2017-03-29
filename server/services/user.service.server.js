module.exports = function(app, models, multer, fs) {

    var passport = require('passport');
    var userModel = models.userModel;
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = require('../config/auth.js');

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        //res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Google-OAuth2 authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        var err = null;
        return done(err, profile);

    }

    //app.get("/api/user", getUsers);
    app.get("/api/user", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/users", findUserByUsername);
    app.get("/api/user/:userId", findUserById);
    app.put('/api/user', updateUser);

    app.get('/api/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    passport.use(new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        console.log("inside localStrategy");
        userModel.findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);

                    } else {
                        console.log(done(null, user));
                        return done(null, user);
                    }
                },
                function(error) {
                    if (error) {
                        return done(error, null);
                    }
                }
            );
    }
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }





    //file uploads
    var upload = multer({
        dest: __dirname + '/../uploads'
    });
    app.post('/api/upload', upload.single('file'), uploadImage);

    function uploadImage(req, res) {
        var image = {
            "originalname": req.file.originalname,
            "size": req.file.size,
            "dataUrl": new Buffer(fs.readFileSync(req.file.path)).toString("base64"),
            "mimetype": req.file.mimetype
        };
        userModel.updateImage(req.body.userId, image)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.sendStatus(400);
                });
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel.createUser(newUser)
            .then(
                function(user) {
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
        userModel.updateUser(id, user)
            .then(function() {
                res.statusCode(200);
            }, function() {
                return null;
            });
    }


    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log(username + " - " + password);
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else {
            res.statusCode(404);
        }
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        userModel.findUserById(id)
            .then(
                function(user) {
                    console.log(user);
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
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.body.username;
        userModel.findUserByUsername(username)
            .then(
                function(user) {
                    if (!user) {
                        res.send({});
                    } else {
                        res.json(user);
                    }
                },
                function(error) {
                    res.statusCode(404);
                }
            );
    }

    function deleteUser() {}
};
