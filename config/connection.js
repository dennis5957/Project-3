// CONNECTION TO MYSQL
const Sequelize = require("sequelize");

const dbName = process.env.dbName || "foodfficiency";
const dbHost = process.env.dbHost || "localhost";
const dbUser = process.env.dbUser || "root";
const dbPassword = process.env.dbPassword || null;

// Creates mySQL connection
module.exports = function () {
  new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
};