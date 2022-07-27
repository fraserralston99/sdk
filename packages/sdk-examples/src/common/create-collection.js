"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
function createCollection(wallet, collectionRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.nft.createCollection(collectionRequest)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.tx.wait()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result.address];
            }
        });
    });
}
exports.createCollection = createCollection;
