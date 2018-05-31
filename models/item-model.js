 const Sequelize = require("sequelize");
 
 module.exports = function (sequelize) {
   this.sequelize = sequelize;
   this.Item = this.sequelize.define('Item', {
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
     },
     name: {
       type: Sequelize.STRING,
       allowNull: false
     },
     description: {
       type: Sequelize.STRING,
       allowNull: false
     },
     expires: {
       type: Sequelize.INTEGER,
       allowNull: false
     },
     price: {
       type: Sequelize.DOUBLE,
       allowNull: false
     }
   });
 };