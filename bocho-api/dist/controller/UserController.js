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
exports.UserController = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userRepo, users, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo
                            .createQueryBuilder("user")
                            .select(["user.email", "user.nombre", "user.apellido", "user.fechaNacimiento", "GradoEstudio.descripcion"])
                            .innerJoin("user.grado", "GradoEstudio")
                            .where("user.gradoId=GradoEstudio.id")
                            .getMany()];
                case 2:
                    //users = await userRepo.find({select:["email","nombre","apellido","fechaNacimiento"],relations:["grado"]});
                    //de esta manera solamente selecciono ciertas columnas de la tabla grado_estudio o de la relacion GradoEstudio
                    users = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal" })];
                case 4:
                    if (users.length > 0) {
                        res.send(users);
                    }
                    else {
                        res.status(404).json({ message: "no hubo resultado" });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepo, user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo
                            .createQueryBuilder("user")
                            .select(["user.email", "user.nombre", "user.apellido", "user.fechaNacimiento", "GradoEstudio.descripcion"])
                            .innerJoin("user.grado", "GradoEstudio")
                            .where("user.gradoId=GradoEstudio.id")
                            .andWhere("user.id = :id", { id: id })
                            .getOneOrFail()];
                case 2:
                    user = _a.sent();
                    res.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: "no hubo resultado" })];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.editUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, id, _a, nombre, apellido, email, nacimiento, grado, userRepo, fecha, e_3, validationOpt, errors, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, nombre = _a.nombre, apellido = _a.apellido, email = _a.email, nacimiento = _a.nacimiento, grado = _a.grado;
                    userRepo = typeorm_1.getRepository(User_1.User);
                    fecha = new Date();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    user.nombre = nombre;
                    user.apellido = apellido;
                    user.modificado = fecha;
                    user.email = email;
                    user.grado = grado;
                    user.fechaNacimiento = nacimiento;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: "no se encontro el usuario" })];
                case 4:
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOpt)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepo.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: "usuario esta en uso" })];
                case 9:
                    res.status(201).json({ message: "usuario modificado" });
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepo, user, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(404).json({ message: "usuario no encontrado" })];
                case 4:
                    userRepo.delete(id);
                    res.status(201).json({ message: "usuario eliminado" });
                    return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=UserController.js.map