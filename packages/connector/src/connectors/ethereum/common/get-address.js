"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethAccounts = exports.getAddress = void 0;
var tslib_1 = require("tslib");
var provider_request_1 = require("./provider-request");
var get_observable_1 = require("./get-observable");
function getAddress(provider) {
    return (0, get_observable_1.getObservable)(provider, ethAccounts, function (_a) {
        var _b = tslib_1.__read(_a, 1), account = _b[0];
        return account;
    }, "accountsChanged");
}
exports.getAddress = getAddress;
function ethAccounts(provider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, provider_request_1.providerRequest)(provider, "eth_accounts")];
        });
    });
}
exports.ethAccounts = ethAccounts;
