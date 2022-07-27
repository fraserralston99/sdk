"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
var tslib_1 = require("tslib");
var logger_1 = require("../logger");
/**
 * Deploy new collection, await transaction, check address
 */
function createCollection(sdk, wallet, deployRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var deployResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("Deploying collection, deploy_token_request=", deployRequest);
                    return [4 /*yield*/, sdk.nft.createCollection(deployRequest)];
                case 1:
                    deployResult = _a.sent();
                    return [4 /*yield*/, deployResult.tx.wait()];
                case 2:
                    _a.sent();
                    expect(deployResult.address).toBeTruthy();
                    expect(typeof deployResult.address).toBe("string");
                    logger_1.Logger.log("Deploy result=", deployResult);
                    return [2 /*return*/, deployResult];
            }
        });
    });
}
exports.createCollection = createCollection;
