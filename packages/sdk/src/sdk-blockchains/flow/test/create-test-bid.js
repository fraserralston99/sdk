"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestBidWithCurrencyId = exports.createTestBid = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var flow_test_common_1 = require("@rarible/flow-test-common");
var converters_1 = require("../common/converters");
var common_1 = require("./common");
function createTestBid(bid, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var submit, bidId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bid.bid({ itemId: itemId })];
                case 1:
                    submit = (_a.sent()).submit;
                    return [4 /*yield*/, submit({
                            amount: 1,
                            price: (0, types_1.toBigNumber)("0.1"),
                            currency: {
                                "@type": "FLOW_FT",
                                contract: common_1.testFlowToken,
                            },
                            originFees: [{ account: (0, converters_1.convertFlowUnionAddress)(flow_test_common_1.FLOW_TESTNET_ACCOUNT_2.address), value: 200 }],
                        })];
                case 2:
                    bidId = _a.sent();
                    expect(bidId).toBeTruthy();
                    return [2 /*return*/, bidId];
            }
        });
    });
}
exports.createTestBid = createTestBid;
function createTestBidWithCurrencyId(bid, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var submit, bidId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bid.bid({ itemId: itemId })];
                case 1:
                    submit = (_a.sent()).submit;
                    return [4 /*yield*/, submit({
                            amount: 1,
                            price: (0, types_1.toBigNumber)("0.1"),
                            currency: (0, types_1.toCurrencyId)(common_1.testFlowToken),
                            originFees: [{ account: (0, converters_1.convertFlowUnionAddress)(flow_test_common_1.FLOW_TESTNET_ACCOUNT_2.address), value: 200 }],
                        })];
                case 2:
                    bidId = _a.sent();
                    expect(bidId).toBeTruthy();
                    return [2 /*return*/, bidId];
            }
        });
    });
}
exports.createTestBidWithCurrencyId = createTestBidWithCurrencyId;
