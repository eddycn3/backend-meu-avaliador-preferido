"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-string-literal */
var JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
if (process.env.NODE_ENV === "production") {
    exports.JWT_SECRET = JWT_SECRET = process.env["JWT_SECRET"];
}
else if (process.env.NODE_ENV === "development") {
    var token = require("../../configsDEV");
    exports.JWT_SECRET = JWT_SECRET = token.DEV_SECRET;
}
/* tslint:enable:no-string-literal */
//# sourceMappingURL=secrets.js.map