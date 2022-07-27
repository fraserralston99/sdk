"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainId = void 0;
var tslib_1 = require("tslib");
var provider_request_1 = require("./provider-request");
var get_observable_1 = require("./get-observable");
function getChainId(provider) {
    return (0, get_observable_1.getObservable)(provider, ethChainId, function (raw) { return parseInt(raw); }, "chainChanged");
}
exports.getChainId = getChainId;
function ethChainId(provider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, provider_request_1.providerRequest)(provider, "eth_chainId")];
        });
    });
}
