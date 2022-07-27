"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugLogger = void 0;
var DebugLogger = /** @class */ (function () {
    function DebugLogger(enabled) {
        this.enabled = enabled;
    }
    DebugLogger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        console.log.apply(console, args);
    };
    DebugLogger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        console.error.apply(console, args);
    };
    return DebugLogger;
}());
exports.DebugLogger = DebugLogger;
