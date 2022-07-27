"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintAndSell = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var domain_1 = require("@rarible/sdk/src/types/nft/mint/domain");
var helpers_1 = require("../helpers");
var logger_1 = require("../logger");
/**
 * Mint and sell NFT and check stock
 */
function mintAndSell(sdk, wallet, prepareMintRequest, mintAndSellRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var prepareMintAndSellResponse, mintAndSellResponse;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("Minting token, prepare_mint_request=", prepareMintRequest);
                    return [4 /*yield*/, sdk.nft.mintAndSell(prepareMintRequest)];
                case 1:
                    prepareMintAndSellResponse = _a.sent();
                    logger_1.Logger.log("mint_and_sell_request=", mintAndSellRequest);
                    return [4 /*yield*/, prepareMintAndSellResponse.submit(mintAndSellRequest)];
                case 2:
                    mintAndSellResponse = _a.sent();
                    logger_1.Logger.log("mint_and_sell_response", mintAndSellResponse);
                    if (mintAndSellResponse.type === domain_1.MintType.ON_CHAIN) {
                        mintAndSellResponse.transaction.wait();
                    }
                    expect(mintAndSellResponse.itemId).not.toBe(null);
                    return [4 /*yield*/, (0, helpers_1.awaitOrderStock)(sdk, mintAndSellResponse.orderId, (0, types_1.toBigNumber)(mintAndSellRequest.supply.toString()))];
                case 3:
                    _a.sent();
                    return [2 /*return*/, mintAndSellResponse];
            }
        });
    });
}
exports.mintAndSell = mintAndSell;
