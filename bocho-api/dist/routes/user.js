"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//get all users
router.get('/list', [jwt_1.checkJwt], UserController_1.UserController.getAll);
//get by id
router.get('/find/:id', [jwt_1.checkJwt], UserController_1.UserController.getById);
//edit user
router.patch('/edit/:id', UserController_1.UserController.editUser);
//delete user
router.delete('/delete/:id', UserController_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map