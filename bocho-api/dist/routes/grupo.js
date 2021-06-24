"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var GrupoController_1 = require("../controller/GrupoController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//lista de todos los grupos
router.get('/list', [jwt_1.checkJwt], GrupoController_1.default.getAll);
//lista de grupos en los que soy miembro
router.get('/myList', [jwt_1.checkJwt], GrupoController_1.default.misGrupos);
//obtener un grupor segun id
router.get('/find/:id', [jwt_1.checkJwt], GrupoController_1.default.getById);
//nuevo grupo
router.post('/new', [jwt_1.checkJwt], GrupoController_1.default.new);
//editar
router.patch('/edit/:id', [jwt_1.checkJwt], GrupoController_1.default.edit);
//eliminar
router.delete('/delete/:id', [jwt_1.checkJwt], GrupoController_1.default.eliminar);
exports.default = router;
//# sourceMappingURL=grupo.js.map