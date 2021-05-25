"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var GradoEstudioController_1 = require("../controller/GradoEstudioController");
var router = express_1.Router();
//lista de grdo de estudio
router.get('/list', GradoEstudioController_1.default.getAll);
exports.default = router;
//# sourceMappingURL=gradoEstudio.js.map