"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var LikeController_1 = require("../controller/LikeController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//like o dislike
router.get('/change/:id', [jwt_1.checkJwt], LikeController_1.default.likeDisLike);
//ver todos los likes
router.get('/list/:id', [jwt_1.checkJwt], LikeController_1.default.getAll);
exports.default = router;
//# sourceMappingURL=like.js.map