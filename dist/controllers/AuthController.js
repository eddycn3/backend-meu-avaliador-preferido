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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Avaliador_1 = __importDefault(require("../models/Avaliador"));
const enums_1 = require("../utils/enums");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
class AuthController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let avaliador;
                const { user, user_info } = request.body;
                const usuario = yield new User_1.default().create(user);
                user_info.user_id = +usuario.id;
                if (usuario.ativo === 0) {
                    return response.status(409).json({ error: "Usuário esta inativo" });
                }
                if (user.user_type === enums_1.UserType.Avalidor) {
                    avaliador = yield new Avaliador_1.default().create(user_info);
                }
                console.log(user_info.user_id);
                return response.json({
                    user: { user_name: user.user_name },
                    user_info: avaliador,
                });
            }
            catch (err) {
                // errorHandlerMiddleware(
                //   new HttpException(404, "Erro ao cadastrar usuario.", err.message),
                //   request,
                //   response
                // );
            }
        });
    }
    authenticate(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_name, password } = request.body;
                console.log(user_name + " - " + password);
                const userId = yield new User_1.default().authUsuario(user_name, password);
                if (userId != null)
                    return response.json({ id: userId });
                return;
            }
            catch (err) {
                next(new HttpException_1.default(404, "Erro na autenticação do usuario", err.message));
                // errorHandlerMiddleware(
                //   new HttpException(404, "Erro ao user", err.message),
                //   request,
                //   response
                // );
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map