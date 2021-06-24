"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integrante = void 0;
var typeorm_1 = require("typeorm");
var Grupo_1 = require("./Grupo");
var User_1 = require("./User");
var Integrante = /** @class */ (function () {
    function Integrante() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Integrante.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Integrante.prototype, "grupoId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Integrante.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Integrante.prototype, "rol", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.integrante; }),
        __metadata("design:type", User_1.User)
    ], Integrante.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Grupo_1.Grupo; }, function (grupo) { return grupo.integrante; }),
        __metadata("design:type", Grupo_1.Grupo)
    ], Integrante.prototype, "grupo", void 0);
    Integrante = __decorate([
        typeorm_1.Entity({ name: "integrante" })
    ], Integrante);
    return Integrante;
}());
exports.Integrante = Integrante;
//# sourceMappingURL=Integrante.js.map