"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var router = express_1.Router();
//get all users
router.get('/', UserController_1.UserController.getAll);
//get by id
router.get('/:id', UserController_1.UserController.getAll);
//create new user
router.post('/', UserController_1.UserController.newUser);
//edit user
router.patch('/id', UserController_1.UserController.editUser);
//delet user
router.delete('/:id', UserController_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map