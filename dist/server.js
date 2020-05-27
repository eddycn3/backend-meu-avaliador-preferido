"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const server = index_1.default.listen(index_1.default.get("port"), () => {
    // tslint:disable-next-line:no-console
    console.log("api is running on localhost:%d in %s mode", index_1.default.get("port"), index_1.default.get("env"));
});
exports.default = server;
//# sourceMappingURL=server.js.map