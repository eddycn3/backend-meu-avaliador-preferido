"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, reason) {
        super();
        this.statusCode = status;
        this.message = message;
        this.reason = reason;
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map