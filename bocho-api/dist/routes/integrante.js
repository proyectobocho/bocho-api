"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IntegranteController_1 = require("../controller/IntegranteController");
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
//obtener integrantes de un grupo
router.get('/list/:idGrupo', [jwt_1.checkJwt], IntegranteController_1.default.getAll);
//nuevo integrante de grupo
router.get('/new/:idGrupo', [jwt_1.checkJwt], IntegranteController_1.default.newIntegrante);
//desunirme del grupo
router.delete('/delete/:idGrupo', [jwt_1.checkJwt], IntegranteController_1.default.delete);
exports.default = router;
//# sourceMappingURL=integrante.js.map