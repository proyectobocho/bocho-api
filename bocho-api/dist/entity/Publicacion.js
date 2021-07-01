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
exports.Publicacion = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Comentario_1 = require("./Comentario");
var Grupo_1 = require("./Grupo");
var Like_1 = require("./Like");
var User_1 = require("./User");
var Publicacion = /** @class */ (function () {
    //agregar validaciones con class-validator
    function Publicacion() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Publicacion.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Publicacion.prototype, "contenido", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Publicacion.prototype, "titulo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Publicacion.prototype, "linkDoc", void 0);
    __decorate([
        typeorm_1.Column({ type: "datetime" }),
        __metadata("design:type", Date)
    ], Publicacion.prototype, "fecha", void 0);
    __decorate([
        typeorm_1.Column({ type: "datetime", default: null }),
        __metadata("design:type", Date)
    ], Publicacion.prototype, "modificado", void 0);
    __decorate([
        typeorm_1.Column({ type: "boolean" }),
        __metadata("design:type", Boolean)
    ], Publicacion.prototype, "privado", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.publicaciones; }, { nullable: false }),
        __metadata("design:type", User_1.User)
    ], Publicacion.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Comentario_1.Comentario; }, function (comentario) { return comentario.publicacion; }),
        __metadata("design:type", Array)
    ], Publicacion.prototype, "comentario", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Grupo_1.Grupo; }, function (grupo) { return grupo.publicaciones; }),
        __metadata("design:type", Grupo_1.Grupo)
    ], Publicacion.prototype, "grupo", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Like_1.Like; }, function (like) { return like.publicacion; }),
        __metadata("design:type", Array)
    ], Publicacion.prototype, "like", void 0);
    Publicacion = __decorate([
        typeorm_1.Entity()
        //agregar validaciones con class-validator
    ], Publicacion);
    return Publicacion;
}());
exports.Publicacion = Publicacion;
//# sourceMappingURL=Publicacion.js.map