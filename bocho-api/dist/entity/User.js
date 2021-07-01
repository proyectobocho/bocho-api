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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var bcrypt = require("bcryptjs");
var GradoEstudio_1 = require("./GradoEstudio");
var Publicacion_1 = require("./Publicacion");
var Comentario_1 = require("./Comentario");
var Integrante_1 = require("./Integrante");
var Like_1 = require("./Like");
var User = /** @class */ (function () {
    //@Unique(['email'])
    function User() {
    }
    User.prototype.hashPassword = function () {
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    };
    User.prototype.cheakPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ length: 30 }),
        class_validator_1.MinLength(3),
        class_validator_1.MaxLength(30),
        class_validator_1.IsNotEmpty(),
        class_validator_1.Matches(/^([a-zA-Z]|[\'\ñ\Ñ]?)*$/),
        __metadata("design:type", String)
    ], User.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column({ length: 30 }),
        class_validator_1.MinLength(3),
        class_validator_1.MaxLength(30),
        class_validator_1.IsNotEmpty(),
        class_validator_1.Matches(/^([a-zA-Z]|[\'\ñ\Ñ]?)*$/),
        __metadata("design:type", String)
    ], User.prototype, "apellido", void 0);
    __decorate([
        typeorm_1.Column({ length: 30, unique: true }),
        class_validator_1.IsEmail(),
        class_validator_1.MinLength(5),
        class_validator_1.MaxLength(30),
        class_validator_1.IsNotEmpty(),
        class_validator_1.Matches(/\S+@\S+\.\S+/),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(8),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ type: "datetime" }),
        __metadata("design:type", Date)
    ], User.prototype, "creado", void 0);
    __decorate([
        typeorm_1.Column({ type: "datetime" }),
        __metadata("design:type", Date)
    ], User.prototype, "modificado", void 0);
    __decorate([
        typeorm_1.Column({ type: "date" }),
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsDate(),
        class_validator_1.MaxDate(new Date),
        __metadata("design:type", Date)
    ], User.prototype, "fechaNacimiento", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return GradoEstudio_1.GradoEstudio; }, function (grado) { return grado.users; }),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", GradoEstudio_1.GradoEstudio)
    ], User.prototype, "grado", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Publicacion_1.Publicacion; }, function (publicacion) { return publicacion.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "publicaciones", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Comentario_1.Comentario; }, function (comentario) { return comentario.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "comentario", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Integrante_1.Integrante; }, function (integrante) { return integrante.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "integrante", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Like_1.Like; }, function (like) { return like.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "like", void 0);
    User = __decorate([
        typeorm_1.Entity()
        //@Unique(['email'])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map