const rp = require("request-promise");
let WALMART_KEY = "pgmf3yv7p8dvu6nevwrbw4ms";

module.exports = function (app) {
    app.get("/product/info/:barcode", function (req, res) {
        var url = `https://api.walmartlabs.com/v1/items?apiKey=${WALMART_KEY}&upc=${req.params.barcode}`;
        //console.log(url);        
        rp(url).then(function (data) {
            //console.log(data);
            res.send(data);
        }).catch(function (e) {
           console.log(e);
            res.send(JSON.stringify({items: [{name: "NO ITEM FOUND"}]}));
        });
    });
};