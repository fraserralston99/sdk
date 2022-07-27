"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateDisconnected = exports.getStateConnecting = exports.getStateConnected = exports.STATE_INITIALIZING = void 0;
var tslib_1 = require("tslib");
var STATE_DISCONNECTED = { status: "disconnected" };
exports.STATE_INITIALIZING = { status: "initializing" };
function getStateConnected(params) {
    return tslib_1.__assign({ status: "connected" }, params);
}
exports.getStateConnected = getStateConnected;
function getStateConnecting(params) {
    return tslib_1.__assign({ status: "connecting" }, params);
}
exports.getStateConnecting = getStateConnecting;
function getStateDisconnected(params) {
    if (params === void 0) { params = {}; }
    if (params.error === undefined) {
        return STATE_DISCONNECTED;
    }
    return tslib_1.__assign({ status: "disconnected" }, params);
}
exports.getStateDisconnected = getStateDisconnected;
