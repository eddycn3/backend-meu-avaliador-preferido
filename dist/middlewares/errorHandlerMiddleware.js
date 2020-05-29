"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    var statusCode = error.statusCode, message = error.message, reason = error.reason;
    response.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: message,
        reason: reason,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map