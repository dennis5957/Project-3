db = require("../controller/db-controller");
moment = require("moment");

module.exports = function (app) {

    /// get all expired or non-expired items
    app.get("/items/:userId/:startDate/:endDate/:isExpired", (req, res) => {
        var userId = req.params.userId;
        var isExpired = req.params.isExpired;
        var startDate = moment(req.params.startDate);
        var endDate = moment(req.params.endDate);
        db.getItems(userId, startDate, endDate, isExpired, (items) => {
            res.send(items);
        }); 
    });

    app.get("/items/:userId", (req, res) => {
        var userId = req.params.userId;
      
        db.getItems(userId, null, null, "false", (items) => {
            res.send(items);
        }); 
    });


    /// adding a new item
    app.post("/item/add/:userId/:upc/:name/:expires/:price", (req, res) => {
        var userId = req.params.userId;
        var upc = req.params.upc;
        var name = req.params.name;
        var expires = req.params.expires;
        var price = req.params.price;

        db.addItem(userId, upc, name, expires, price, (item) => {
            res.send(item);
        });
    });


    /// removing an item (consumed)
    app.post("/item/remove/:itemId", (req, res) => {
        var itemId = req.params.itemId;

        db.removeItem(itemId, (count) => {
            res.send({count:count});
        });
    });

};