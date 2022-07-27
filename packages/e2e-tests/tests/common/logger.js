"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var tslib_1 = require("tslib");
var logsEnabled = process.env.LOGGER_ENABLED === "1";
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (logsEnabled) {
            console.log.apply(console, tslib_1.__spreadArray([], tslib_1.__read(args), false));
        }
    };
    return Logger;
}());
exports.Logger = Logger;
