"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacionController = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Publicacion_1 = require("../entity/Publicacion");
var PublicacionController = /** @class */ (function () {
    function PublicacionController() {
    }
    PublicacionController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var publicacionRepo, publicacion, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    publicacionRepo = typeorm_1.getRepository(Publicacion_1.Publicacion);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, publicacionRepo
                            .createQueryBuilder("publicacion")
                            .select([
                            "publicacion.linkDoc",
                            "publicacion.contenido",
                            "publicacion.fecha",
                            "publicacion.modificado",
                            "publicacion.titulo",
                            "publicacion.id",
                            "User.nombre",
                            "User.apellido",
                            "User.email",
                            "comentario.id",
                        ])
                            .innerJoin("publicacion.user", "User")
                            .leftJoin("publicacion.comentario", "comentario")
                            .where("publicacion.privado=0")
                            .andWhere("publicacion.grupo IS NULL")
                            .orderBy("publicacion.modificado", "DESC")
                            .getMany()];
                case 2:
                    /* publicacion = await publicacionRepo
                        .find({
                            select: ["linkDoc", "contenido", "fecha"],
                            where: { privado: false }
                        }); */
                    publicacion = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("e: ", e_1);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 4:
                    if (publicacion.length > 0) {
                        return [2 /*return*/, res.status(200).json({ publicacion: publicacion })];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: "no hubo resultado" })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PublicacionController.getMyPublications = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, publicacionRepo, publicacion, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    publicacionRepo = typeorm_1.getRepository(Publicacion_1.Publicacion);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, publicacionRepo
                            .createQueryBuilder("publicacion")
                            .select([
                            "publicacion.linkDoc",
                            "publicacion.contenido",
                            "publicacion.fecha",
                            "publicacion.modificado",
                            "publicacion.id",
                            "publicacion.titulo",
                            "publicacion.privado",
                            "grupo.nombre",
                            "comentario.descripcion",
                            "comentario.fecha",
                            "user.nombre",
                            "user.apellido",
                            "user.email",
                        ])
                            .leftJoin("publicacion.comentario", "comentario")
                            .leftJoin("publicacion.grupo", "grupo")
                            .leftJoin("comentario.user", "user")
                            .where("publicacion.user=:id", { id: userId })
                            .orderBy("publicacion.modificado", "DESC")
                            .getMany()];
                case 2:
                    publicacion = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log("e: ", e_2);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal :(" })];
                case 4:
                    if (publicacion.length > 0) {
                        return [2 /*return*/, res.send(publicacion)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: "no hubo resultado" })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PublicacionController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, id, publicacionRepo, publicacion, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    id = req.params.id;
                    publicacionRepo = typeorm_1.getRepository(Publicacion_1.Publicacion);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, publicacionRepo
                            .findOneOrFail(id, {
                            select: ["linkDoc", "modificado", "privado", "contenido", "fecha"],
                            where: { user: userId }
                        })];
                case 2:
                    publicacion = _a.sent();
                    return [2 /*return*/, res.send(publicacion)];
                case 3:
                    e_3 = _a.sent();
                    console.log("e: ", e_3);
                    return [2 /*return*/, res.status(404).json({ message: "no hubo resultado" })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    PublicacionController.newPublicacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, contenido, linkDoc, privado, titulo, grupoId, publicacion, fecha, priv, validationOpt, errors, error, i, j, publicacionRepo, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, contenido = _a.contenido, linkDoc = _a.linkDoc, privado = _a.privado, titulo = _a.titulo, grupoId = _a.grupoId;
                    publicacion = new Publicacion_1.Publicacion();
                    fecha = new Date();
                    if (privado == 'true') {
                        priv = true;
                    }
                    else {
                        priv = false;
                    }
                    if (grupoId) {
                        publicacion.grupo = grupoId;
                    }
                    //console.log(priv);
                    publicacion.linkDoc = linkDoc;
                    publicacion.contenido = contenido;
                    publicacion.privado = priv;
                    publicacion.fecha = fecha;
                    publicacion.user = userId;
                    publicacion.modificado = fecha;
                    publicacion.titulo = titulo;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(publicacion, validationOpt)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        error = [];
                        for (i in errors) {
                            for (j in errors[i].constraints) {
                                error.push({
                                    "message": errors[i].constraints[j],
                                    "campo": errors[i].property
                                });
                            }
                        }
                        //console.log(err);
                        return [2 /*return*/, res.status(400).json({ message: "hubo algunos errores", errors: error })];
                    }
                    publicacionRepo = typeorm_1.getRepository(Publicacion_1.Publicacion);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, publicacionRepo.save(publicacion)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _b.sent();
                    console.log("e: ", e_4);
                    return [2 /*return*/, res.status(409).json({ message: "hubo algun error al publicar" })];
                case 5:
                    res.status(200).json({ message: "publicacion realizada" });
                    return [2 /*return*/];
            }
        });
    }); };
    PublicacionController.editPublicacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, id, _a, contenido, linkDoc, privado, titulo, publicacion, priv, publicacionRepo, fecha, e_5, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    id = req.params.id;
                    _a = req.body, contenido = _a.contenido, linkDoc = _a.linkDoc, privado = _a.privado, titulo = _a.titulo;
                    publicacionRepo = typeorm_1.getRepository(Publicacion_1.Publicacion);
                    fecha = new Date();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, publicacionRepo.findOneOrFail(id, { where: { user: userId } })];
                case 2:
                    publicacion = _b.sent();
                    if (privado == 'true') {
                        priv = true;
                    }
                    else {
                        priv = false;
                    }
                    publicacion.contenido = contenido;
                    publicacion.linkDoc = linkDoc;
                    publicacion.privado = priv;
                    publicacion.modificado = fecha;
                    publicacion.titulo = titulo;
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    console.log("e: ", e_5);
                    return [2 /*return*/, res.status(404).json({ message: "no se encontro la publicacion" })];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, publicacionRepo.save(publicacion)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: "publicacion esta en uso" })];
                case 7:
                    res.status(201).json({ message: "publicacion modificada" });
                    return [2 /*return*/];
            }
        });
    }); };
    PublicacionController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, id, publicacionRepo, publicacion, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    id = req.params.id;
                    publicacionRepo = typeorm_1.getRepository(Publicacion_1.Publicacion);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, publicacionRepo.findOneOrFail(id, { where: { user: userId } })];
                case 2:
                    publicacion = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    console.log("e: ", e_7);
                    return [2 /*return*/, res.status(404).json({ message: "publicacion no encontrada" })];
                case 4:
                    publicacionRepo.delete(id);
                    return [2 /*return*/, res.status(201).json({ message: "publicacion eliminada" })];
            }
        });
    }); };
    return PublicacionController;
}());
exports.PublicacionController = PublicacionController;
exports.default = PublicacionController;
//# sourceMappingURL=PublicacionController.js.map