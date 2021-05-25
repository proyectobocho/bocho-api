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
exports.GradoEstudio = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var GradoEstudio = /** @class */ (function () {
    function GradoEstudio() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], GradoEstudio.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ length: 30 }),
        __metadata("design:type", String)
    ], GradoEstudio.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return User_1.User; }, function (user) { return user.grado; }),
        __metadata("design:type", Array)
    ], GradoEstudio.prototype, "users", void 0);
    GradoEstudio = __decorate([
        typeorm_1.Entity()
    ], GradoEstudio);
    return GradoEstudio;
}());
exports.GradoEstudio = GradoEstudio;
//# sourceMappingURL=GradoEstudio.js.map