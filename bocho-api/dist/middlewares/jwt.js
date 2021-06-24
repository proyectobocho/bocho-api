"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
exports.checkJwt = function (req, res, next) {
    var token = req.headers['auth'];
    var jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (e) {
        return res.status(401).json({ message: "no esta logueado" });
    }
    //const { userId, email } = jwtPayload;
    //console.log("jwtPayload: ",jwtPayload);
    //const newToken = jwt.sign({ userId, email }, config.jwtSecret, { expiresIn: "1h" });
    //res.setHeader('token', newToken);
    next();
};
//# sourceMappingURL=jwt.js.map