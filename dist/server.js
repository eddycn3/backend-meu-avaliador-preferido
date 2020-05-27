"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var server = index_1.default.listen(index_1.default.get("port"), function () {
    // tslint:disable-next-line:no-console
    console.log("api is running on localhost:%d in %s mode", index_1.default.get("port"), index_1.default.get("env"));
});
exports.default = server;
/*"prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
   // "build": "tsc",
    "prestart": "npm run build",
    */
//# sourceMappingURL=server.js.map