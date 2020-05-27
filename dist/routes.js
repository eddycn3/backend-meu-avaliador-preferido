"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AvaliadorController_1 = __importDefault(require("./controllers/AvaliadorController"));
var AuthController_1 = __importDefault(require("./controllers/AuthController"));
var Routes = /** @class */ (function () {
    function Routes() {
        this.routes = express_1.default.Router();
        this.registerRoutes();
    }
    Routes.prototype.registerRoutes = function () {
        this.routes.get("/avaliadores/:id", AvaliadorController_1.default.index);
        this.routes.post("/auth/create", AuthController_1.default.create);
        this.routes.post("/auth/authenticate", AuthController_1.default.authenticate);
    };
    return Routes;
}());
exports.default = new Routes();
// routes.post("/register", AuthController.create);
// routes.get("/avaliadores/:id", AvaliadorController.index);
// routes.put("/avaliadores/:id", AvaliadorController.update);
// routes.get("/alunos/:id", AlunoController.index);
// routes.post("/alunos", AlunoController.create);
// routes.put("/alunos/:id", AlunoController.update);
//# sourceMappingURL=routes.js.map