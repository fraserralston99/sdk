"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerRequest = void 0;
var tslib_1 = require("tslib");
function providerRequest(provider, method, params) {
    if (params === void 0) { params = []; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if ("request" in provider && typeof provider.request === "function") {
                return [2 /*return*/, provider.request({ method: method, params: params })];
            }
            else {
                return [2 /*return*/, requestLegacy(provider, method, params)];
            }
            return [2 /*return*/];
        });
    });
}
exports.providerRequest = providerRequest;
function requestLegacy(provider, method, params) {
    return new Promise(function (resolve, reject) {
        try {
            legacySend(provider, {
                jsonrpc: "2.0",
                id: new Date().getTime(),
                method: method,
                params: params,
            }, function (error, result) {
                var err = error || (result === null || result === void 0 ? void 0 : result.error);
                if (err) {
                    reject(err);
                }
                if (result === null || result === void 0 ? void 0 : result.result) {
                    resolve(result.result);
                }
                reject(new Error("Can't handle JSON-RPC request"));
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function legacySend(provider, payload, callback) {
    if (provider !== null && typeof provider === "object") {
        if ("sendAsync" in provider && typeof provider.sendAsync === "function") {
            provider.sendAsync(payload, callback);
        }
        else if ("send" in provider && typeof provider.send === "function") {
            provider.send(payload, callback);
        }
        else {
            throw new Error("No send method defined");
        }
    }
    else {
        throw new Error("No send method defined");
    }
}
