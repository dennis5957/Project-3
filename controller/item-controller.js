
module.exports = function(sequelize) {
    const Item = require("../models/item-model")(sequelize);
  
    sequelize.sync();
  
    this.addItem = function (name, description, expires, price) {
      Item.create({
       name: name,
       description: description,
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
  
  };