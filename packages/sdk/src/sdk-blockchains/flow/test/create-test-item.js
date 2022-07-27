"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestItem = void 0;
var tslib_1 = require("tslib");
var common_1 = require("./common");
var meta = "ipfs://ipfs/QmNe7Hd9xiqm1MXPtQQjVtksvWX6ieq9Wr6kgtqFo9D4CU";
function createTestItem(mint) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var prepareMint, itemId, flowItemId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mint.prepare({
                        collectionId: common_1.testFlowCollection,
                    })];
                case 1:
                    prepareMint = _a.sent();
                    return [4 /*yield*/, prepareMint.submit({
                            uri: meta,
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    itemId = (_a.sent()).itemId;
                    flowItemId = itemId.split(":")[2];
                    expect(parseInt(flowItemId)).toBeGreaterThan(0);
                    return [2 /*return*/, itemId];
            }
        });
    });
}
exports.createTestItem = createTestItem;
