require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const http = require('http');
const https = require('https');
const hbs = require("hbs");
const fs = require("fs");

const privateKey = fs.readFileSync('./ssl/privateKey.key', 'utf8');
const certificate = fs.readFileSync('./ssl/certificate.crt', 'utf8');

const sequelize = require("./config/connection");

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

hbs.registerHelper("navi", (text) => {
    return JSON.stringify(activeNav);
});

hbs.registerHelper("pagejs", () => {
    return `/assets/js/${activeNav}.js`;
});

hbs.registerHelper("appName", () => {
    return "FoodFFiciency";
});

hbs.registerHelper("appRoot", () => {
    return process.env.APP_ROOT;
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

var options = {
    key: privateKey,
    cert: certificate
};


// var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

// var httpPort = process.env.httpPort || 3000;
var httpsPort = process.env.httpsPort || 3443;

// httpServer.listen(httpPort, function () {
//     console.log(`Listening http port ${httpPort}`);
// });

httpsServer.listen(httpsPort, function () {
    console.log(`Listenting https port ${httpsPort}`);
});