"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../routes/auth");
var user_1 = require("../routes/user");
var gradoEstudio_1 = require("../routes/gradoEstudio");
var publicacion_1 = require("../routes/publicacion");
var comentario_1 = require("../routes/comentario");
var grupo_1 = require("../routes/grupo");
var integrante_1 = require("../routes/integrante");
var like_1 = require("../routes/like");
var routes = express_1.Router();
routes.use('/auth', auth_1.default);
routes.use('/user', user_1.default);
routes.use('/grado-estudio', gradoEstudio_1.default);
routes.use('/publicacion', publicacion_1.default);
routes.use('/comentario', comentario_1.default);
routes.use('/grupo', grupo_1.default);
routes.use('/integrante', integrante_1.default);
routes.use('/like', like_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map