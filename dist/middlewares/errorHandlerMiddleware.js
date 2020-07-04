"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HttpExceptionError = /** @class */ (function (_super) {
    __extends(HttpExceptionError, _super);
    function HttpExceptionError(message, statusCode, reason) {
        var _this = _super.call(this) || this;
        _this.toString = function () {
            return "HttpExceptionError (statusCode : " + _this.statusCode + ", message : " + _this.message + ", reason : " + _this.reason + ")";
        };
        _this.statusCode = statusCode;
        _this.message = message;
        _this.reason = reason;
        return _this;
    }
    return HttpExceptionError;
}(Error));
exports.HttpExceptionError = HttpExceptionError;
function handleError(error, request, response, next) {
    console.log(error.toString());
    var status = error.statusCode || 500;
    var msg = error.message || "Algo ocorreu de errado";
    return response.status(status).json({
        status: status,
        msg: msg,
    });
}
exports.handleError = handleError;
//# sourceMappingURL=errorHandlerMiddleware.js.map