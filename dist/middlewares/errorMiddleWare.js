"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    const full_error = error.full_error;
    response.status(status).send({
        status,
        message,
        request,
        full_error,
    });
}
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleWare.js.map