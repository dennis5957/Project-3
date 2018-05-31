// CONNECTION TO MYSQL
const Sequelize = require("sequelize");
const moment = require("moment");

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "foodfficiency";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || null;
const dbUri = process.env.DB_URI || process.env.JAWSDB_URL || null;

const Op = Sequelize.Op;

console.log(dbName);

var sequelize;
// Creates mySQL connection
if (dbUri !== null) {
  sequelize = new Sequelize(dbUri, {
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}

var User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true    
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
});


var Item = sequelize.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  upc: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expires: {
    type: Sequelize.DATE,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

// Create table if not exists, 'force: true' drops then recreates table
User.sync({force: true});
Item.sync({force: true});
