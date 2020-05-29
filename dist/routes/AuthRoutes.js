"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this.authController = new AuthController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    AuthRoutes.prototype.routes = function () {
        this.router.post("/create", this.authController.create);
        this.router.post("/authenticate", this.authController.authenticate);
    };
    return AuthRoutes;
}());
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=AuthRoutes.js.map