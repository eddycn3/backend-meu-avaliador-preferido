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
const Avaliador_1 = __importDefault(require("../models/Avaliador"));
class AvaliadorController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const avaliador = yield new Avaliador_1.default().getByID(+id);
            if (avaliador == null) {
                return response.status(404).json({ error: "registro não encontrado!" });
            }
            return response.json(avaliador);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const avaliador = new Avaliador_1.default().create(request.body);
            if (avaliador) {
                return response.status(409).json({ error: "registro já existente!" });
            }
            return response.json(avaliador);
        });
    }
}
exports.default = new AvaliadorController();
//# sourceMappingURL=AvaliadorController.js.map