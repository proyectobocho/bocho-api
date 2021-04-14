"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var router = express_1.Router();
//login
router.post('/login', AuthController_1.default.login);
exports.default = router;
//# sourceMappingURL=auth.js.map