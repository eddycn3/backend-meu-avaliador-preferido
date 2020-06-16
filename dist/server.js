"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var AvaliadorRoutes_1 = require("./routes/AvaliadorRoutes");
var AuthRoutes_1 = require("./routes/AuthRoutes");
var errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.initializeErrorHandling();
    }
    Server.prototype.config = function () {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
    };
    Server.prototype.routes = function () {
        this.app.use("/auth", new AuthRoutes_1.AuthRoutes().router);
        this.app.use("/avaliadores", new AvaliadorRoutes_1.AvaliadorRoutes().router);
    };
    Server.prototype.initializeErrorHandling = function () {
        this.app.use(errorHandlerMiddleware_1.handleError);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log("API is running on port:%d in %s mode", _this.app.get("port"), _this.app.get("env"));
        });
    };
    return Server;
}());
var server = new Server();
server.start();
//# sourceMappingURL=server.js.map