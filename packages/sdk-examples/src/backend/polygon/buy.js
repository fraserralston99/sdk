"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var build_1 = require("@rarible/sdk/build");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var common_1 = require("../common");
if (process.env["BUYOUT_ITEM_ID"] === undefined) {
    throw new Error("Provide BUYOUT_ITEM_ID as environment variables!");
}
(0, common_1.updateNodeGlobalVars)();
// Buy function
function buy(item) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var raribleSdkWallet, raribleSdk, order, request, response, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!process.env["ETH_PRIVATE_KEY"]) {
                        throw new Error("Expected ETH_PRIVATE_KEY env variable");
                    }
                    raribleSdkWallet = (0, common_1.initWallet)(process.env["ETH_PRIVATE_KEY"]);
                    raribleSdk = (0, build_1.createRaribleSdk)(raribleSdkWallet, "staging", { fetchApi: node_fetch_1.default });
                    console.log("SDK was created, searching sell order for item=".concat(item, "..."));
                    return [4 /*yield*/, raribleSdk.apis.item.getItemById({ itemId: "ETHEREUM:" + item })];
                case 1:
                    order = (_a.sent()).bestSellOrder;
                    if (!order) return [3 /*break*/, 4];
                    console.log("Sell order was found, purchasing...");
                    return [4 /*yield*/, raribleSdk.order.buy({ orderId: order.id })];
                case 2:
                    request = _a.sent();
                    console.log("The transaction was sent, waiting for a Rarible Protocol response...");
                    return [4 /*yield*/, request.submit({ amount: 1 })];
                case 3:
                    response = _a.sent();
                    console.log("Rarible Protocol response:", response);
                    return [3 /*break*/, 5];
                case 4:
                    console.warn("Sell order was not found for item=".concat(item));
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log("Error", e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Buying 1 item of https://rinkeby.rarible.com/token/0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7:18661571940073987827662103527955627190048515004732602540856362757661044768826?tab=owners
buy(process.env["BUYOUT_ITEM_ID"]);
