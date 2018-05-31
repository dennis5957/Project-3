const Sequelize = require("sequelize");
///////////  User Model  ///////////////////


  module.exports = function(sequelize) {
     sequelize.define('User', {
     email: {
       type: Sequelize.STRING,
       primaryKey: true
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
     },
     indexes: [{
       unique: true,
       fields: ["email"]
     }]
   });
  };