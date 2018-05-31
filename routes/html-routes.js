

module.exports = function (app) {
    app.get("/", (req, res) => {
        activeNav = "home";
        res.render("home", {
            pageTitle: "Home",
            welcomeMessage: "Est veniam pariatur mollit et magna ex."
        });
    });

    app.get("/inventory", (req, res) => {
        activeNav = "inventory";
        res.render("inventory", {
            pageTitle: "Inventory"
        });
    });

    app.get("/map", (req, res) => {
        activeNav = "map";
        res.render("map", {
            pageTitle: "Stores Near You",
            googleMapsKey: process.env.GOOGLE_MAPS_API_KEY
        });
    });

    app.get("/signin", (req, res) => {
        activeNav = "signin";
        res.render("signin", {
            pageTitle: "Sign-In"
        });
    });

    app.get("/signup", (req, res) => {
        activeNav = "signup";
        res.render("signup", {
            pageTitle: "Signup"
        });
    });

    app.get("/scan", (req, res) => {
        activeNav = "scan";
        res.render("scan", {
            pageTitle: "Scan",
            SCANDIT_KEY: process.env.SCANDIT_KEY
        });
    });

    app.get("/report", (req, res) => {
        activeNav = "report";
        res.render("report", {
            pageTitle: "Report"
        });
    });

    app.get("/bad", (req, res) => {
        activeNav = "bad";
        res.status(400).render("bad",{
            pageTitle: "BAD",
            errorMessage: "Somebody screwed up. Unable to process your request!"
        });
    });   
};