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
exports.LikeController = void 0;
var typeorm_1 = require("typeorm");
var Like_1 = require("../entity/Like");
var LikeController = /** @class */ (function () {
    function LikeController() {
    }
    LikeController.likeDisLike = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, id, likeRepo, like, e_1, e_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    id = req.params.id;
                    likeRepo = typeorm_1.getRepository(Like_1.Like);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, likeRepo
                            .createQueryBuilder("like")
                            .select([
                            "like.id",
                            "publicacion.id",
                            "user.id"
                        ])
                            .innerJoin("like.user", "user")
                            .innerJoin("like.publicacion", "publicacion")
                            .where("like.user=:user", { user: userId })
                            .andWhere("like.publicacion=:post", { post: id })
                            .getOneOrFail()];
                case 2:
                    like = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log("e: ", e_1);
                    return [3 /*break*/, 4];
                case 4:
                    console.log(like);
                    if (!(like != undefined)) return [3 /*break*/, 9];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, likeRepo
                            .createQueryBuilder()
                            .delete()
                            .from(Like_1.Like)
                            .where("like.publicacionId=:id", { id: id })
                            .andWhere("like.userId=:user", { user: userId })
                            .execute()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    console.log("e: ", e_2);
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal 1" })];
                case 8: return [2 /*return*/, res.status(200).json({ message: "dislike >:V" })];
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, likeRepo
                            .createQueryBuilder()
                            .insert()
                            .into(Like_1.Like)
                            .values([{
                                flag: true,
                                userId: userId,
                                publicacionId: parseInt(id)
                            }])
                            .execute()];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_3 = _a.sent();
                    console.log("e: ", e_3);
                    return [2 /*return*/, res.status(400).json({ message: "algo anda mal 2" })];
                case 12: return [2 /*return*/, res.status(200).json({ message: "like :)" })];
            }
        });
    }); };
    LikeController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, likeRepo, likes, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    likeRepo = typeorm_1.getRepository(Like_1.Like);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, likeRepo
                            .createQueryBuilder("like")
                            .select([
                            "like.id",
                            //"publicacion.id",
                            "user.nombre",
                            "user.apellido",
                            "user.id"
                        ])
                            //.innerJoin("like.publicacion", "publicacion")
                            .innerJoin("like.user", "user")
                            .where("like.publicacion=:id", { id: id })
                            .getMany()];
                case 2:
                    likes = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    console.log("e: ", e_4);
                    return [2 /*return*/, res.status(404).json({ message: "algo anda mal" })];
                case 4: return [2 /*return*/, res.status(200).json(likes)];
            }
        });
    }); };
    return LikeController;
}());
exports.LikeController = LikeController;
exports.default = LikeController;
//# sourceMappingURL=LikeController.js.map