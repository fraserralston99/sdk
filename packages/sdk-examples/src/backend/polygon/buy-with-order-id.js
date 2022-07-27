"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var types_1 = require("@rarible/types");
var sdk_1 = require("@rarible/sdk");
var common_1 = require("../common");
if (process.env["ORDER_ID"] === undefined) {
    throw new Error("Provide ORDER_ID as environment variables!");
}
(0, common_1.updateNodeGlobalVars)();
// Buy function
function buy(item) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var raribleSdkWallet, raribleSdk, orderId, request, response, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    if (!process.env["ETH_PRIVATE_KEY"]) {
                        throw new Error("Expected ETH_PRIVATE_KEY env variable");
                    }
                    return [4 /*yield*/, (0, common_1.initWalletWeb3)(process.env["ETH_PRIVATE_KEY"])
                        //@ts-ignore
                    ];
                case 1:
                    raribleSdkWallet = _a.sent();
                    raribleSdk = (0, sdk_1.createRaribleSdk)(raribleSdkWallet, "prod", { fetchApi: node_fetch_1.default });
                    if (!process.env["ORDER_ID"]) {
                        throw new Error("ORDER_ID has not been specified");
                    }
                    orderId = (0, types_1.toOrderId)(process.env["ORDER_ID"]);
                    if (!orderId) return [3 /*break*/, 5];
                    console.log("Sell order was found, purchasing...");
                    return [4 /*yield*/, raribleSdk.order.buy({ orderId: orderId })];
                case 2:
                    request = _a.sent();
                    console.log("The transaction was sent, waiting for a Rarible Protocol response...");
                    return [4 /*yield*/, request.submit({ amount: 1 })];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.wait()];
                case 4:
                    _a.sent();
                    console.log("Rarible Protocol response:", response);
                    return [3 /*break*/, 6];
                case 5:
                    console.warn("Sell order was not found for item=".concat(item));
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log("Error", e_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Buying 1 item of https://rinkeby.rarible.com/token/0x1AF7A7555263F275433c6Bb0b8FdCD231F89B1D7:18661571940073987827662103527955627190048515004732602540856362757661044768826?tab=owners
buy(process.env["ORDER_ID"]);
