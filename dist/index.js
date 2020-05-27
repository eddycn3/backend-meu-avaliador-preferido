"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
var app = express_1.default();
app.set("port", process.env.PORT || 3336);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default.routes);
app.use(errorHandlerMiddleware_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map