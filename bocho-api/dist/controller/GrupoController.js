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
exports.GrupoController = void 0;
var typeorm_1 = require("typeorm");
var Grupo_1 = require("../entity/Grupo");
var Integrante_1 = require("../entity/Integrante");
var GrupoController = /** @class */ (function () {
    function GrupoController() {
    }
    GrupoController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var grupoRepo, grupos, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    grupoRepo = typeorm_1.getRepository(Grupo_1.Grupo);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, grupoRepo.find({ select: ["creacion", "descripcion", "id", "nombre", "foto"] })];
                case 2:
                    grupos = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("e: ", e_1);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 4:
                    if (grupos.length > 0) {
                        return [2 /*return*/, res.status(200).send(grupos)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: "no se encontraron grupos" })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    GrupoController.misGrupos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var integranteRepo, userId, grupos, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    userId = res.locals.jwtPayload.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select([
                            "integrante.id",
                            "grupo.id",
                            "grupo.nombre",
                            "grupo.foto"
                        ])
                            .innerJoin("integrante.grupo", "grupo")
                            .where("integrante.user=:user", { user: userId })
                            .getMany()];
                case 2:
                    grupos = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log("e: ", e_2);
                    return [2 /*return*/, res.status(404).json({ message: "hubo algunos problemas" })];
                case 4: return [2 /*return*/, res.status(201).json(grupos)];
            }
        });
    }); };
    GrupoController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userId, grupoRepo, grupo, e_3, integranteRepo, rol, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userId = res.locals.jwtPayload.userId;
                    grupoRepo = typeorm_1.getRepository(Grupo_1.Grupo);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, grupoRepo
                            .createQueryBuilder("grupo")
                            .select([
                            "grupo.descripcion",
                            "grupo.creacion",
                            "grupo.id",
                            "grupo.foto",
                            "grupo.nombre",
                            "publicacion.linkDoc",
                            "publicacion.contenido",
                            "publicacion.fecha",
                            "publicacion.modificado",
                            "publicacion.id",
                            "publicacion.titulo",
                            "User.nombre",
                            "User.apellido",
                            "User.email",
                            "comentario.id",
                        ])
                            .leftJoin("grupo.publicaciones", "publicacion")
                            .leftJoin("publicacion.user", "User")
                            .leftJoin("publicacion.comentario", "comentario")
                            .where("grupo.id=:id", { id: id })
                            .orderBy("publicacion.modificado", "DESC")
                            .getMany()];
                case 2:
                    grupo = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log("e: ", e_3);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 4:
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select("integrante.rol")
                            .where("integrante.grupoId=:grupo", { grupo: id })
                            .andWhere("integrante.userId=:user", { user: userId })
                            .getOneOrFail()];
                case 6:
                    rol = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_4 = _a.sent();
                    console.log("e: ", e_4);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 2" })];
                case 8: return [2 /*return*/, res.status(200).json({ grupo: grupo, rol: rol })];
            }
        });
    }); };
    GrupoController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, descripcion, nombre, foto, fecha, grupoRepo, grupo, e_5, idGrupo, integranteRepo, integrante, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, descripcion = _a.descripcion, nombre = _a.nombre, foto = _a.foto;
                    fecha = new Date();
                    grupoRepo = typeorm_1.getRepository(Grupo_1.Grupo);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, grupoRepo
                            .createQueryBuilder()
                            .insert()
                            .into(Grupo_1.Grupo)
                            .values([{
                                creacion: fecha,
                                descripcion: descripcion,
                                nombre: nombre,
                                foto: foto
                            }])
                            .execute()];
                case 2:
                    grupo = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    console.log("e: ", e_5);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 4:
                    idGrupo = grupo.raw.insertId;
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder()
                            .insert()
                            .into(Integrante_1.Integrante)
                            .values([{
                                grupoId: idGrupo,
                                userId: userId,
                                rol: "admin"
                            }])
                            .execute()];
                case 6:
                    integrante = _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_6 = _b.sent();
                    console.log("e2: ", e_6);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 2" })];
                case 8: return [2 /*return*/, res.status(200).json({ message: "se creo el grupo con exito" })];
            }
        });
    }); };
    GrupoController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, id, _a, descripcion, nombre, foto, integranteRepo, rol, e_7, grupoRepo, grupo, e_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    id = req.params.id;
                    _a = req.body, descripcion = _a.descripcion, nombre = _a.nombre, foto = _a.foto;
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select("integrante.rol")
                            .where("integrante.grupoId=:grupo", { grupo: id })
                            .andWhere("integrante.userId=:user", { user: userId })
                            .getOneOrFail()];
                case 2:
                    rol = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _b.sent();
                    console.log("e: ", e_7);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 2" })];
                case 4:
                    if (rol.rol != "admin") {
                        return [2 /*return*/, res.status(401).json({ message: "no es admin del grupo" })];
                    }
                    grupoRepo = typeorm_1.getRepository(Grupo_1.Grupo);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, grupoRepo
                            .createQueryBuilder()
                            .update(Grupo_1.Grupo)
                            .set({
                            descripcion: descripcion,
                            foto: foto,
                            nombre: nombre,
                        })
                            .where("grupo.id =:grupo", { grupo: id })
                            .execute()];
                case 6:
                    grupo = _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_8 = _b.sent();
                    console.log("e: ", e_8);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal" })];
                case 8: return [2 /*return*/, res.status(200).json({ message: "grupo editado con exito" })];
            }
        });
    }); };
    GrupoController.eliminar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, id, integranteRepo, rol, e_9, borrado, e_10, grupoRepo, grupo, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    id = req.params.id;
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select("integrante.rol")
                            .where("integrante.grupoId=:grupo", { grupo: id })
                            .andWhere("integrante.userId=:user", { user: userId })
                            .getOneOrFail()];
                case 2:
                    rol = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_9 = _a.sent();
                    console.log("e: ", e_9);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 4:
                    if (rol.rol != "admin") {
                        return [2 /*return*/, res.status(401).json({ message: "no es admin del grupo" })];
                    }
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder()
                            .delete()
                            .from(Integrante_1.Integrante)
                            .where("integrante.grupoId=:grupo", { grupo: id })
                            .execute()];
                case 6:
                    borrado = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_10 = _a.sent();
                    console.log("e: ", e_10);
                    return [2 /*return*/, res.status(404).json({ message: "algo salio mal" })];
                case 8:
                    grupoRepo = typeorm_1.getRepository(Grupo_1.Grupo);
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, grupoRepo
                            .createQueryBuilder()
                            .delete()
                            .from(Grupo_1.Grupo)
                            .where("grupo.id=:id", { id: id })
                            .execute()];
                case 10:
                    grupo = _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_11 = _a.sent();
                    console.log("e: ", e_11);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 2" })];
                case 12: return [2 /*return*/, res.status(200).json({ message: "grupo borrado" })];
            }
        });
    }); };
    return GrupoController;
}());
exports.GrupoController = GrupoController;
exports.default = GrupoController;
//# sourceMappingURL=GrupoController.js.map