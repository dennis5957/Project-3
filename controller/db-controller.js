// CONNECTION TO MYSQL
const Sequelize = require("sequelize");
const moment = require("moment");

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "foodfficiency";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || null;
const dbUri = process.env.JAWSDB_URL || null;

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
    type: Sequelize.STRING,
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
// User.sync({force: true});
// Item.sync({force: true});




////////////  USER ACTIONS  /////////////////////////
addUser = function (email, password, name, callback) {
  User.count({
    where: {
      email: email
    }
  }).then((count) => {
    if (count !== 0) {
      callback({
        success: false,
        body: "This email is already in use"
      });
    } else {
      User.create({
        email: email,
        password: password,
        name: name
      }).then((user) => {
        callback({
          success: true,
          body: user
        });
      }).catch(err => {
        callback({
          success: false,
          body: JSON.stringify(err)
        });
      });
    }
  });
};

authenticate = function (email, password, callback) {
  User.findAll({
    where: {
      email: email,
      password: password
    }
  }).then((users) => {
    if (users.length > 0) {
      callback({
        success: true,
        body: users[0]
      });
    } else {
      callback({
        success: false,
        body: "Invalid credentials. Did you fat-finger the keyboard?"
      });
    }
  }).catch(e => {
    callback({
      success: false,
      body: e.message
    });
  });
};



//////////////  ITEM ACTIONS  ///////////////////////
getItems = function (userId, startDate, endDate, isExpired, callback) {
  if (isExpired == "true") {
    Item.findAll({
      where: {
        userId: userId,
        expires: {
          [Op.gt]: moment(startDate),
          [Op.lt]: moment(endDate)
        }
      },
      order: sequelize.col("expires")
    }).then((items) => {
      callback(items);
    });
  } else {
    Item.findAll({
      where: {
        userId: userId,
        expires: {
          [Op.gt]: moment()
        }
      },
      order: sequelize.col("expires")
    }).then((items) => {
      callback(items);
    });
  }
};


addItem = function (userId, upc, name, expires, price, callback) {
  Item.create({
    userId: userId,
    upc: upc,
    name: name,
    expires: expires,
    price: price
  }).then((user) => {
    callback({
      success: true,
      body: user
    });
  }).catch(e => {
    callback({
      success: false,
      body: e.message
    });
  });
};

removeItem = function (id, callback) {
  Item.destroy({
    where: {
      id: id
    }
  }).then((destroyedRows) => {
    callback(destroyedRows);
  }).catch(err => console.log(err.message));
};

module.exports = {
  addUser,
  authenticate,
  getItems,
  addItem,
  removeItem
};