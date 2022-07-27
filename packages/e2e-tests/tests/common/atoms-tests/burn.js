"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.burn = void 0;
var tslib_1 = require("tslib");
var helpers_1 = require("../helpers");
var logger_1 = require("../logger");
/**
 * Burn NFT and check result
 */
function burn(sdk, prepareBurnRequest, burnRequest, supply) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var prepareBurnResponse, burnTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("Burning token, prepare_burn_request=", prepareBurnRequest);
                    return [4 /*yield*/, sdk.nft.burn(prepareBurnRequest)
                        // Submit burn
                    ];
                case 1:
                    prepareBurnResponse = _a.sent();
                    return [4 /*yield*/, prepareBurnResponse.submit(burnRequest)];
                case 2:
                    burnTx = _a.sent();
                    if (!burnTx) return [3 /*break*/, 4];
                    return [4 /*yield*/, burnTx.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, helpers_1.awaitForItemSupply)(sdk, prepareBurnRequest.itemId, supply)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.burn = burn;
