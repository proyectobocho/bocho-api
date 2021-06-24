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
exports.IntegranteController = void 0;
var typeorm_1 = require("typeorm");
var Integrante_1 = require("../entity/Integrante");
var IntegranteController = /** @class */ (function () {
    function IntegranteController() {
    }
    IntegranteController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, idGrupo, integranteRepo, admin, e_1, integrantes, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    idGrupo = req.params.idGrupo;
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select(["integrante"])
                            .innerJoin("integrante.grupo", "grupo")
                            .where("integrante.grupo=:ig", { ig: idGrupo })
                            .andWhere("integrante.user=:id", { id: userId })
                            .andWhere("integrante.rol=:rol", { rol: 'admin' })
                            .getOneOrFail()];
                case 2:
                    admin = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("e: ", e_1);
                    return [2 /*return*/, res.status(404).json({ message: "no es admin del grupo" })];
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select([
                            "integrante.rol",
                            "user.nombre",
                            "user.apellido",
                            "user.email"
                        ])
                            .innerJoin("integrante.user", "user")
                            .where("integrante.grupoId=:id", { id: idGrupo })
                            .getMany()];
                case 5:
                    integrantes = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_2 = _a.sent();
                    console.log("e: ", e_2);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal" })];
                case 7:
                    if (integrantes.length > 0) {
                        return [2 /*return*/, res.status(200).send(integrantes)];
                    }
                    else {
                        return [2 /*return*/, res.status(404).json({ message: "no hay integrantes / grupo" })];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    IntegranteController.newIntegrante = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, idGrupo, integranteRepo, miembro, e_3, integrante, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    idGrupo = req.params.idGrupo;
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder("integrante")
                            .select()
                            .innerJoin("integrante.grupo", "grupo")
                            .where("integrante.user=:user", { user: userId })
                            .andWhere("grupo.id=:grupo", { grupo: idGrupo })
                            .getMany()];
                case 2:
                    miembro = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log("e: ", e_3);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 4:
                    if (miembro.length > 0) {
                        return [2 /*return*/, res.status(404).json({ message: "usted esta en este grupo" })];
                    }
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder()
                            .insert()
                            .into(Integrante_1.Integrante)
                            .values([{
                                userId: userId,
                                grupoId: parseInt(idGrupo),
                                rol: "member"
                            }])
                            .execute()];
                case 6:
                    integrante = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_4 = _a.sent();
                    console.log("e: ", e_4);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal 1" })];
                case 8: return [2 /*return*/, res.status(200).json({ message: "se ha unido al grupo" })];
            }
        });
    }); };
    IntegranteController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, idGrupo, integranteRepo, borrado, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    idGrupo = req.params.idGrupo;
                    integranteRepo = typeorm_1.getRepository(Integrante_1.Integrante);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, integranteRepo
                            .createQueryBuilder()
                            .delete()
                            .from(Integrante_1.Integrante)
                            .where("integrante.userId=:user", { user: userId })
                            .andWhere("integrante.grupoId=:grupo", { grupo: idGrupo })
                            .execute()];
                case 2:
                    borrado = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    console.log("e: ", e_5);
                    return [2 /*return*/, res.status(404).json({ message: "algo salio mal" })];
                case 4:
                    console.log("borrado", borrado);
                    return [2 /*return*/, res.status(200).json({ message: "salio del grupo" })];
            }
        });
    }); };
    return IntegranteController;
}());
exports.IntegranteController = IntegranteController;
exports.default = IntegranteController;
//# sourceMappingURL=IntegranteController.js.map