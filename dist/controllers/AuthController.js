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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var Avaliador_1 = __importDefault(require("../models/Avaliador"));
var enums_1 = require("../utils/enums");
var HttpException_1 = __importDefault(require("../exceptions/HttpException"));
var MsgRetorno_1 = __importDefault(require("../models/common/MsgRetorno"));
var jwt = __importStar(require("jsonwebtoken"));
var authMiddleWare_1 = __importDefault(require("../middlewares/authMiddleWare"));
var secrets_1 = require("../utils/secrets");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.authorize = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                authMiddleWare_1.default(request, response, next);
                return [2 /*return*/];
            });
        });
    };
    AuthController.prototype.create = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var avaliador, _a, user_name, password, user_type, user_info, user, usuario, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        avaliador = void 0;
                        _a = request.body, user_name = _a.user_name, password = _a.password, user_type = _a.user_type, user_info = _a.user_info;
                        user = new User_1.default();
                        user.user_name = user_name;
                        user.password = password;
                        return [4 /*yield*/, user.create(user)];
                    case 1:
                        usuario = _b.sent();
                        if (usuario.id === undefined) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json(new MsgRetorno_1.default(0, "Erro na criação do usuario"))];
                        }
                        user_info.user_id = +usuario.id;
                        if (usuario.ativo === 0) {
                            return [2 /*return*/, response
                                    .status(409)
                                    .json(new MsgRetorno_1.default(0, "usuario inativo"))];
                        }
                        if (!(user_type === enums_1.UserType.Avalidor)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Avaliador_1.default().create(user_info)];
                    case 2:
                        avaliador = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, response.json({
                            user_name: usuario.user_name,
                            user_info: avaliador,
                        })];
                    case 4:
                        err_1 = _b.sent();
                        next(new HttpException_1.default(400, "Erro na criação do usuario", err_1.message));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.authenticate = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userObj, _a, user_name, password, user_type, userId, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        userObj = void 0;
                        _a = request.body, user_name = _a.user_name, password = _a.password, user_type = _a.user_type;
                        return [4 /*yield*/, new User_1.default().authUsuario(user_name, password)];
                    case 1:
                        userId = _b.sent();
                        if (userId === 0) {
                            return [2 /*return*/, response
                                    .status(404)
                                    .json(new MsgRetorno_1.default(0, "usuario não localizado."))];
                        }
                        if (!(user_type === enums_1.UserType.Avalidor)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Avaliador_1.default().getByUserID(userId)];
                    case 2:
                        userObj = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, response.json({
                            id: userId,
                            user_info: userObj,
                            token: jwt.sign({ userId: userId }, secrets_1.JWT_SECRET, {
                                expiresIn: 86400,
                            }),
                        })];
                    case 4:
                        err_2 = _b.sent();
                        next(new HttpException_1.default(400, "Erro na autenticação do usuario", err_2.message));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map