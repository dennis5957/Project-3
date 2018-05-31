
module.exports = function(app, sequelize) {

    var mode = process.env.MODE || "production";

    app.use((req, res, next) => {
        if (mode === "maintenance") {
            res.render("maintenance.hbs");
        } else {
            next();
        }
    });

    app.get("/favicon.ico", (req, res) => {
        res.sendFile(process.env.APP_ROOT + "/public/assets/img/favicon.png");
    });

    require("./html-routes")(app);
    require("./db-user-routes")(app);
    require("./db-item-routes")(app);
    require("./scandit-routes")(app);
    require("./walmart-routes")(app);
   

    // // intercept all uncaught requests
    // app.get("/*", (req, res) => {
    //     res.redirect("/bad");
    // });
};