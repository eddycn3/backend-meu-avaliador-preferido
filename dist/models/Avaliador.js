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
const connection_1 = __importDefault(require("../database/connection"));
class Avaliador {
    create(avaliador) {
        return __awaiter(this, void 0, void 0, function* () {
            const v = yield this.verificaAvaliador(avaliador);
            if (v) {
                return v;
            }
            yield connection_1.default("avaliadores").insert(avaliador);
            return avaliador;
        });
    }
    getByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const avaliador = yield connection_1.default("avaliadores").where("id", id).first();
            if (!avaliador) {
                return null;
            }
            return avaliador;
        });
    }
    update(entity) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    verificaAvaliador(avaliador) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = yield connection_1.default("avaliadores")
                .where({
                nome: avaliador.nome,
                empresa: avaliador.empresa,
                site: avaliador.site,
                email: avaliador.email,
                telefone: avaliador.telefone,
            })
                .first();
            if (a)
                return a;
        });
    }
}
exports.default = Avaliador;
//# sourceMappingURL=Avaliador.js.map