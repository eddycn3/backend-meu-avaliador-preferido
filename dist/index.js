"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errorHandlerMiddleware"));
const app = express_1.default();
app.set("port", process.env.PORT || 3336);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default.routes);
app.use(errorHandlerMiddleware_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map