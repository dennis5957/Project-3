module.exports = function (app) {

    app.get("/scandit", function (req, res) {
        res.sendFile(process.env.APP_ROOT + "/node_modules/scandit-sdk/build/browser/index.min.js");
    });

    // The Scandit configure engineLocation attribute is for a directory
    // Two files are called from this directory, hence the :file parameter
    app.get("/scandit/engine/:file", function (req, res) {
        res.sendFile(process.env.APP_ROOT + `/node_modules/scandit-sdk/build/${req.params.file}`);
    });


};