db = require("../controller/db-controller");

module.exports = function (app) {

    app.post("/user/add/:email/:password/:name", (req, res) => {
            var email = req.params.email;
            var password = req.params.password;
            var name = req.params.name;

           db.addUser(email, password, name, (data) => {
                res.send(data);
           });
    });

    app.get("/auth/:email/:password", (req, res) => {
        var email = req.params.email;
        var password = req.params.password;

        db.authenticate(email, password, (data) => {
            res.send(data);
        });
    });

};