"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
var routes_1 = require("./routes");
var PORT = process.env.PORT || 3000;
typeorm_1.createConnection()
    .then(function (async) {
    // create express app
    var app = express();
    //Middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    //Routes
    app.use('/', routes_1.default);
    //
    app.get('/', function (req, res) {
        res.send("Bienvenido a BOCHO");
    });
    // start express server
    app.listen(PORT, function () {
        console.log("Server running on port " + PORT);
    });
})
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map