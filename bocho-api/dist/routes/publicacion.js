"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PublicacionController_1 = require("../controller/PublicacionController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//lista de todas las publicaciones publicas 
router.get('/list', [jwt_1.checkJwt], PublicacionController_1.default.getAll);
//lista de mis publicacion
router.get('/my-list', [jwt_1.checkJwt], PublicacionController_1.default.getMyPublications);
//obtener una publicacion personal
router.get('/find/:id', [jwt_1.checkJwt], PublicacionController_1.default.getById);
//nueva publicacion personal
router.post('/new', [jwt_1.checkJwt], PublicacionController_1.default.newPublicacion);
//editar publicacion
router.patch('/update/:id', [jwt_1.checkJwt], PublicacionController_1.default.editPublicacion);
//borrar publicacion
router.delete('/delete/:id', [jwt_1.checkJwt], PublicacionController_1.default.delete);
exports.default = router;
//# sourceMappingURL=publicacion.js.map