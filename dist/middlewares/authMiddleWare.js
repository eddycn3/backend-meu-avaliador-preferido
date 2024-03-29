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
var secrets_1 = require("../utils/secrets");
function authMiddleware(request, response, next) {
    var auth = request.headers.authorization;
    if (!auth)
        return response.status(401).send({ errorMsg: "NO_TOKEN_PROVIDED" });
    var parts = auth.split(" ");
    if (parts.length !== 2)
        return response.status(401).send({ errorMsg: "TOKEN_ERROR" });
    var schema = parts[0], token = parts[1];
    if (!/^Bearer$/i.test(schema))
        return response.status(401).send({ errorMsg: "TOKEN_MALFORMED" });
    jwt.verify(token, secrets_1.JWT_SECRET, function (err, decoded) {
        if (err)
            return response.status(401).send({ errorMsg: "INVALID_TOKEN" });
        return next();
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleWare.js.map