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
const connection_1 = __importDefault(require("../database/connection"));
const bcrypt = __importStar(require("bcryptjs"));
class Usuario {
    create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield connection_1.default("usuarios")
                .where({
                user_name: usuario.user_name,
            })
                .first();
            if (userDB != null) {
                return userDB;
            }
            const { user_name } = usuario;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(usuario.password, salt);
            usuario.id = yield connection_1.default("usuarios").insert({
                user_name,
                password: hash,
                password_salt: salt,
                ativo: 1,
            });
            console.log("Usuario.create: " + usuario.id);
            return usuario;
        });
    }
    authUsuario(user, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDB = yield connection_1.default("usuarios")
                .where({
                user_name: user,
            })
                .first();
            const match = yield bcrypt.compare(pass, userDB.password);
            if (match) {
                return +userDB.id;
            }
        });
    }
    getByID(id) {
        return connection_1.default("usuarios").where("id", id).first();
    }
}
exports.default = Usuario;
//# sourceMappingURL=User.js.map