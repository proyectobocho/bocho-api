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
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var class_validator_1 = require("class-validator");
var GradoEstudio_1 = require("../entity/GradoEstudio");
var mailer_1 = require("../config/mailer");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, userRepo, user, e_1, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!(email && password)) {
                        return [2 /*return*/, res.status(400).json({ message: "Usuario y/o contraseña son requeridos" })];
                    }
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail({ where: { email: email } })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: "Usuario y/o contraseña incorrectos" })];
                case 4:
                    if (!user.cheakPassword(password)) {
                        return [2 /*return*/, res.status(400).json({ message: "Usuario y/o contraseña incorrecto" })];
                    }
                    token = jwt.sign({ userId: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: "1h" });
                    return [2 /*return*/, res.json({ message: "ok", token: token, userId: user.id, user: { email: user.email, nombre: user.nombre, apellido: user.apellido } })];
            }
        });
    }); };
    AuthController.newUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, nombre, apellido, password, email, nacimiento, grado, user, fecha, año, err, validationOpt, errors, i, j, gradoRepo, e_2, userRepo, e_3, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, nombre = _a.nombre, apellido = _a.apellido, password = _a.password, email = _a.email, nacimiento = _a.nacimiento, grado = _a.grado;
                    user = new User_1.User();
                    fecha = new Date();
                    año = new Date(nacimiento);
                    user.nombre = nombre;
                    user.apellido = apellido;
                    user.password = password;
                    user.creado = fecha;
                    user.modificado = fecha;
                    user.email = email;
                    user.fechaNacimiento = año;
                    user.grado = grado;
                    err = [];
                    validationOpt = { validationError: { target: false, value: false } };
                    if (isNaN(parseInt(grado))) {
                        err.push({
                            "message": "grado must be a number",
                            "campo": "grado"
                        });
                    }
                    return [4 /*yield*/, class_validator_1.validate(user, validationOpt)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0 || err.length > 0) {
                        for (i in errors) {
                            for (j in errors[i].constraints) {
                                err.push({
                                    "message": errors[i].constraints[j],
                                    "campo": errors[i].property
                                });
                            }
                        }
                        return [2 /*return*/, res.status(400).json({ message: err })];
                    }
                    gradoRepo = typeorm_1.getRepository(GradoEstudio_1.GradoEstudio);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, gradoRepo.findOneOrFail(grado)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _b.sent();
                    console.log("e", e_2);
                    return [2 /*return*/, res.status(400).json({ message: "no se encontro el grado de estudio" })];
                case 5:
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    user.hashPassword();
                    return [4 /*yield*/, userRepo.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_3 = _b.sent();
                    console.log(e_3);
                    return [2 /*return*/, res.status(409).json({ message: "el usuario ya existe y/o hubo problemas al registrar" })];
                case 9:
                    _b.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, mailer_1.transporter.sendMail({
                            from: '"Bocho 👻" <proyectobocho@gmail.com>',
                            to: user.email,
                            subject: "Registro ✔",
                            //text: "Hello world?", // plain text body
                            html: "\n                <p>Gracias " + user.nombre + " " + user.apellido + " por registrarse en <b>BOCHO</b></p>\n                <br>\n                <a href=\"https://proyecto-bocho.herokuapp.com\">IR A BOCHO</a>",
                        })];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_4 = _b.sent();
                    console.log("error email: ", e_4);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/, res.status(200).json({ message: "usuario creado" })];
            }
        });
    }); };
    AuthController.changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, oldPassword, newPassword, userRepo, user, e_5, validationOpt, errors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    if (!(oldPassword && newPassword)) {
                        res.status(400).json({ message: "nueva y/o antigua contraseña son requeridos" });
                    }
                    userRepo = typeorm_1.getRepository(User_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepo.findOneOrFail(userId)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _b.sent();
                    res.status(400).json({ message: "algo anda mal :V" });
                    return [3 /*break*/, 4];
                case 4:
                    if (!user.cheakPassword(oldPassword)) {
                        res.status(401).json({ message: "revise su actual contraseña" });
                    }
                    user.password = newPassword;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOpt)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json({ message: errors })];
                    }
                    //hash password
                    user.hashPassword();
                    userRepo.save(user);
                    res.json({ message: "Contraseña cambiada" });
                    return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map