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
exports.Comentario = void 0;
var typeorm_1 = require("typeorm");
var Publicacion_1 = require("./Publicacion");
var User_1 = require("./User");
var Comentario = /** @class */ (function () {
    function Comentario() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Comentario.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Comentario.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Comentario.prototype, "publicacionId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Comentario.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.comentario; }),
        __metadata("design:type", User_1.User)
    ], Comentario.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Publicacion_1.Publicacion; }, function (publicacion) { return publicacion.comentario; }),
        __metadata("design:type", Publicacion_1.Publicacion)
    ], Comentario.prototype, "publicacion", void 0);
    Comentario = __decorate([
        typeorm_1.Entity({ name: "comentario" })
    ], Comentario);
    return Comentario;
}());
exports.Comentario = Comentario;
//# sourceMappingURL=Comentario.js.map