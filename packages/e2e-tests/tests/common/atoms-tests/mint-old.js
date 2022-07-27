"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mint = void 0;
var tslib_1 = require("tslib");
var domain_1 = require("@rarible/sdk/src/types/nft/mint/domain");
var retry_1 = require("@rarible/sdk/src/common/retry");
var logger_1 = require("../logger");
/**
 * Mint NFT and check result
 */
function mint(sdk, wallet, prepareMintRequest, mintRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mintPrepare, mintResponse, transaction, nft, response;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("Minting token, prepare_mint_request=", prepareMintRequest);
                    return [4 /*yield*/, sdk.nft.mint(prepareMintRequest)];
                case 1:
                    mintPrepare = _a.sent();
                    logger_1.Logger.log("mint_request=", mintRequest);
                    return [4 /*yield*/, mintPrepare.submit(mintRequest)];
                case 2:
                    mintResponse = _a.sent();
                    expect(mintResponse.type).toBe(domain_1.MintType.ON_CHAIN);
                    if (!(mintResponse.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResponse.transaction.wait()];
                case 3:
                    transaction = _a.sent();
                    expect(transaction.blockchain).toEqual(wallet.blockchain);
                    expect(transaction.hash).toBeTruthy();
                    return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var item;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.item.getItemById({ itemId: mintResponse.itemId })];
                                    case 1:
                                        item = _a.sent();
                                        if (item.supply.toString() < mintRequest.supply.toString()) {
                                            throw new Error("Expected supply ".concat(mintRequest.supply.toString(), ", but current supply ").concat(item.supply.toString()));
                                        }
                                        return [2 /*return*/, item];
                                }
                            });
                        }); })];
                case 4:
                    nft = _a.sent();
                    expect(nft.id).toEqual(mintResponse.itemId);
                    response = { mintResponse: mintResponse, nft: nft };
                    logger_1.Logger.log("mint response/nft", response);
                    return [2 /*return*/, response];
                case 5: throw new Error("Must be on chain");
            }
        });
    });
}
exports.mint = mint;