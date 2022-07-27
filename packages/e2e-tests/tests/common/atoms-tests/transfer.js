"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
var tslib_1 = require("tslib");
var logger_1 = require("../logger");
/**
 * Transfer NFT
 */
function transfer(sdk, prepareTransferRequest, transferRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var prepareTransferResponse;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("transfer_request=", transferRequest);
                    return [4 /*yield*/, sdk.nft.transfer(prepareTransferRequest)
                        // Submit transfer
                    ];
                case 1:
                    prepareTransferResponse = _a.sent();
                    // Submit transfer
                    return [4 /*yield*/, prepareTransferResponse.submit(transferRequest)];
                case 2:
                    // Submit transfer
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.transfer = transfer;
