"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AvaliadorController_1 = require("../controllers/AvaliadorController");
var AuthController_1 = require("../controllers/AuthController");
var AvaliadorRoutes = /** @class */ (function () {
    function AvaliadorRoutes() {
        this.avaliadorController = new AvaliadorController_1.AvaliadorController();
        this.authController = new AuthController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    AvaliadorRoutes.prototype.routes = function () {
        this.router.get("/:id", this.authController.authorize, this.avaliadorController.getAvaliador);
    };
    return AvaliadorRoutes;
}());
exports.AvaliadorRoutes = AvaliadorRoutes;
//# sourceMappingURL=AvaliadorRoutes.js.map