"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const { statusCode, message, reason } = error;
    response.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        reason,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map