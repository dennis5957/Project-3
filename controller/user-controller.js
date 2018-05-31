
module.exports = function(sequelize) {
  this.sequelize = sequelize;
  this.User = require("../models/user-model")(this.sequelize);
  this.User.sync();

  this.addUser = function (email, password, name, callback) {
    this.User.create({
      email: email,
      password: password,
      name: name
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

};