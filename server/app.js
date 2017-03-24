module.exports = function(app, multer, fs) {

    var models = require("./models/models.server.js")();

    require("./services/user.service.server.js")(app, models, multer, fs);

    app.get("/users", function(req, res) {
        res.sendStatus(200);
        console.log("Successful Get");
    });

};
