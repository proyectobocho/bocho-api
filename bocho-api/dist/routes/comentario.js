"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ComentarioController_1 = require("../controller/ComentarioController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//crear comentario
router.post('/new/:id', [jwt_1.checkJwt], ComentarioController_1.default.newComentario);
//obtener comentarios
router.get('/list/:id', [jwt_1.checkJwt], ComentarioController_1.default.getAll);
exports.default = router;
//# sourceMappingURL=comentario.js.map