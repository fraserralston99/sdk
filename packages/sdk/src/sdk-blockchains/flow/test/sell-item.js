"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellItemWithCurrencyId = exports.sellItem = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var flow_test_common_1 = require("@rarible/flow-test-common");
var converters_1 = require("../common/converters");
var common_1 = require("./common");
function sellItem(sell, itemId, priceDecimals) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var submit, orderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sell.sell()];
                case 1:
                    submit = (_a.sent()).submit;
                    return [4 /*yield*/, submit({
                            amount: 1,
                            price: (0, types_1.toBigNumber)(priceDecimals),
                            currency: {
                                "@type": "FLOW_FT",
                                contract: common_1.testFlowToken,
                            },
                            itemId: itemId,
                            originFees: [{ account: (0, converters_1.convertFlowUnionAddress)(flow_test_common_1.FLOW_TESTNET_ACCOUNT_2.address), value: 200 }],
                        })];
                case 2:
                    orderId = _a.sent();
                    expect(orderId).toBeTruthy();
                    return [2 /*return*/, orderId];
            }
        });
    });
}
exports.sellItem = sellItem;
function sellItemWithCurrencyId(sell, itemId, priceDecimals) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var submit, orderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sell.sell()];
                case 1:
                    submit = (_a.sent()).submit;
                    return [4 /*yield*/, submit({
                            amount: 1,
                            price: (0, types_1.toBigNumber)(priceDecimals),
                            currency: (0, types_1.toCurrencyId)(common_1.testFlowToken),
                            itemId: itemId,
                            originFees: [{ account: (0, converters_1.convertFlowUnionAddress)(flow_test_common_1.FLOW_TESTNET_ACCOUNT_2.address), value: 200 }],
                        })];
                case 2:
                    orderId = _a.sent();
                    expect(orderId).toBeTruthy();
                    return [2 /*return*/, orderId];
            }
        });
    });
}
exports.sellItemWithCurrencyId = sellItemWithCurrencyId;
