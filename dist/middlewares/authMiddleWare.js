"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var authConfig = __importStar(require("../configs/configConsts"));
function authMiddleware(request, response, next) {
    var auth = request.headers.authorization;
    if (!auth)
        return response.status(401).send({ error: "No token provided" });
    var parts = auth.split(" ");
    if (parts.length !== 2)
        return response.status(401).send({ error: "Token error" });
    var schema = parts[0], token = parts[1];
    if (!/^Bearer$/i.test(schema))
        return response.status(401).send({ error: "Token malformed" });
    jwt.verify(token, authConfig.default, function (err, decoded) {
        if (err)
            return response.status(401).send({ error: "Invalid Token" });
        var userId = request.body.userId;
        console.log(decoded);
        return next();
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleWare.js.map