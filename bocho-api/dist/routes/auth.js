"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//login
router.post('/login', AuthController_1.default.login);
//change password
router.post('/change-password', [jwt_1.checkJwt], AuthController_1.default.changePassword);
//new user
router.post('/register', AuthController_1.default.newUser);
exports.default = router;
//# sourceMappingURL=auth.js.map