"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProvider = exports.initProviders = void 0;
var tslib_1 = require("tslib");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var web3_1 = tslib_1.__importDefault(require("web3"));
function initProviders(_a) {
    var _b = _a === void 0 ? {} : _a, pk1 = _b.pk1, pk2 = _b.pk2;
    var providerSettings = {
        rpcUrl: "https://dev-ethereum-node.rarible.com",
        networkId: 300500,
    };
    var _c = (0, ethereum_sdk_test_common_1.createE2eProvider)(pk1, providerSettings), provider1 = _c.provider, wallet1 = _c.wallet;
    var _d = (0, ethereum_sdk_test_common_1.createE2eProvider)(pk2, providerSettings), provider2 = _d.provider, wallet2 = _d.wallet;
    return {
        web31: new web3_1.default(provider1),
        web32: new web3_1.default(provider2),
        wallet1: wallet1,
        wallet2: wallet2,
    };
}
exports.initProviders = initProviders;
function initProvider() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = ethereum_sdk_test_common_1.createE2eProvider.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)), provider = _a.provider, wallet = _a.wallet;
    return {
        provider: provider,
        wallet: wallet,
        web3: new web3_1.default(provider),
    };
}
exports.initProvider = initProvider;
