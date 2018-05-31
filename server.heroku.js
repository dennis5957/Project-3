require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const http = require('http');
// const https = require('https');
const hbs = require("hbs");
const fs = require("fs");

process.env.APP_ROOT = __dirname.toString();

const app = express();

hbs.registerPartials(__dirname + "/views/partials");

////////////////////  HELPERS  ///////////////////////////////

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("activeNav", (text) => {
    return activeNav;
});

hbs.registerHelper("pagejs", () => {
    return `/assets/js/${activeNav}.js`;
});

hbs.registerHelper("appName", () => {
    return "FoodFFiciency";
});


// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Setup hbs as view engine for express
app.set("view engine", "hbs");


// Security best practice to prevent hackers from targeting expressjs apps
app.disable('x-powered-by');

//  Bring in api and html routes
require("./routes/routes.js")(app);


var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
