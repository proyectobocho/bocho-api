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
exports.Grupo = void 0;
var typeorm_1 = require("typeorm");
var Integrante_1 = require("./Integrante");
var Publicacion_1 = require("./Publicacion");
var Grupo = /** @class */ (function () {
    //@Unique(['nombre'])
    function Grupo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Grupo.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Grupo.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.Column({ type: "datetime" }),
        __metadata("design:type", Date)
    ], Grupo.prototype, "creacion", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Grupo.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Grupo.prototype, "foto", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Publicacion_1.Publicacion; }, function (publicacion) { return publicacion.grupo; }),
        __metadata("design:type", Array)
    ], Grupo.prototype, "publicaciones", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Integrante_1.Integrante; }, function (integrante) { return integrante.grupo; }),
        __metadata("design:type", Array)
    ], Grupo.prototype, "integrante", void 0);
    Grupo = __decorate([
        typeorm_1.Entity()
        //@Unique(['nombre'])
    ], Grupo);
    return Grupo;
}());
exports.Grupo = Grupo;
//# sourceMappingURL=Grupo.js.map