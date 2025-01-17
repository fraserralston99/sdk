"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEVMBlockchain = exports.getSimpleFlowFungibleBalance = exports.getCollectionId = exports.createRaribleSdk = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("./domain");
var config_1 = require("./config");
var domain_2 = require("./types/nft/mint/domain");
var ethereum_1 = require("./sdk-blockchains/ethereum");
var flow_1 = require("./sdk-blockchains/flow");
var tezos_1 = require("./sdk-blockchains/tezos");
var union_1 = require("./sdk-blockchains/union");
var apis_1 = require("./common/apis");
var middleware_1 = require("./common/middleware/middleware");
var logger_middleware_1 = require("./common/logger/logger-middleware");
var solana_1 = require("./sdk-blockchains/solana");
var immutablex_1 = require("./sdk-blockchains/immutablex");
function createRaribleSdk(wallet, env, config) {
    var _a, _b, _c, _d, _e;
    var blockchainConfig = (0, config_1.getSdkConfig)(env);
    var apis = (0, apis_1.createApisSdk)(env, config === null || config === void 0 ? void 0 : config.apiClientParams);
    var ethConfig = tslib_1.__assign(tslib_1.__assign({}, (_a = config === null || config === void 0 ? void 0 : config.blockchain) === null || _a === void 0 ? void 0 : _a.ETHEREUM), { params: config === null || config === void 0 ? void 0 : config.apiClientParams, logs: (_b = config === null || config === void 0 ? void 0 : config.logs) !== null && _b !== void 0 ? _b : domain_1.LogsLevel.TRACE });
    var instance = (0, union_1.createUnionSdk)((0, ethereum_1.createEthereumSdk)(filterWallet(wallet, api_client_1.BlockchainGroup.ETHEREUM), apis, api_client_1.Blockchain.ETHEREUM, blockchainConfig.ethereumEnv, ethConfig), (0, flow_1.createFlowSdk)(filterWallet(wallet, api_client_1.BlockchainGroup.FLOW), apis, blockchainConfig.flowEnv, undefined, (_d = (_c = config === null || config === void 0 ? void 0 : config.blockchain) === null || _c === void 0 ? void 0 : _c.FLOW) === null || _d === void 0 ? void 0 : _d.auth), (0, tezos_1.createTezosSdk)(filterWallet(wallet, api_client_1.BlockchainGroup.TEZOS), apis, blockchainConfig), (0, ethereum_1.createEthereumSdk)(filterWallet(wallet, api_client_1.BlockchainGroup.ETHEREUM), apis, api_client_1.Blockchain.POLYGON, blockchainConfig.polygonNetwork, ethConfig), (0, solana_1.createSolanaSdk)(filterWallet(wallet, api_client_1.BlockchainGroup.SOLANA), apis, blockchainConfig.solanaNetwork, (_e = config === null || config === void 0 ? void 0 : config.blockchain) === null || _e === void 0 ? void 0 : _e.SOLANA), (0, immutablex_1.createImmutablexSdkBlank)());
    setupMiddleware(apis, instance, { wallet: wallet, env: env, config: config });
    return tslib_1.__assign(tslib_1.__assign({}, instance), { nft: tslib_1.__assign(tslib_1.__assign({}, instance.nft), { mintAndSell: createMintAndSell(instance.nft.mint, instance.order.sell) }), order: tslib_1.__assign(tslib_1.__assign({}, instance.order), { sell: createSell(instance.order.sell, apis) }), apis: apis, wallet: wallet });
}
exports.createRaribleSdk = createRaribleSdk;
/**
 * Create middleware controller & wrap methods
 */
function setupMiddleware(apis, internalSdk, sdkContext) {
    var e_1, _a;
    var _b, _c, _d, _e, _f;
    var middlewarer = new middleware_1.Middlewarer();
    if (((_b = sdkContext.config) === null || _b === void 0 ? void 0 : _b.logs) !== domain_1.LogsLevel.DISABLED) {
        middlewarer.use((0, logger_middleware_1.getInternalLoggerMiddleware)((_d = (_c = sdkContext.config) === null || _c === void 0 ? void 0 : _c.logs) !== null && _d !== void 0 ? _d : domain_1.LogsLevel.TRACE, sdkContext));
    }
    try {
        for (var _g = tslib_1.__values(((_f = (_e = sdkContext.config) === null || _e === void 0 ? void 0 : _e.middlewares) !== null && _f !== void 0 ? _f : [])), _h = _g.next(); !_h.done; _h = _g.next()) {
            var middleware = _h.value;
            middlewarer.use(middleware);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
        }
        finally { if (e_1) throw e_1.error; }
    }
    for (var prop in apis) {
        //@ts-ignore
        //todo: better wrap for apis methods
        middlewarer.wrapObjectMethods(apis[prop], { namespace: "apis." + prop });
    }
    for (var prop in internalSdk) {
        //@ts-ignore
        middlewarer.wrapObjectMethods(internalSdk[prop], { namespace: prop });
    }
}
function filterWallet(wallet, blockchain) {
    if ((wallet === null || wallet === void 0 ? void 0 : wallet.blockchain) === blockchain) {
        return wallet;
    }
    return undefined;
}
function createSell(sell, apis) {
    var _this = this;
    return function (_a) {
        var itemId = _a.itemId;
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var item, response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, apis.item.getItemById({ itemId: itemId })];
                    case 1:
                        item = _b.sent();
                        return [4 /*yield*/, sell({ blockchain: item.blockchain })];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, response), { maxAmount: item.supply, submit: response.submit
                                    .before(function (input) { return (tslib_1.__assign({ itemId: itemId }, input)); }) })];
                }
            });
        });
    };
}
function createMintAndSell(mint, sell) {
    var _this = this;
    return function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var mintResponse, collectionId, blockchain, sellResponse, mintAction, sellAction;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mint(request)];
                case 1:
                    mintResponse = _a.sent();
                    collectionId = getCollectionId(request);
                    blockchain = getBlockchainCollectionId(collectionId);
                    return [4 /*yield*/, sell({ blockchain: blockchain })];
                case 2:
                    sellResponse = _a.sent();
                    mintAction = mintResponse.submit
                        .around(function (input) { return (tslib_1.__assign({}, input)); }, function (mintResponse, initial) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(mintResponse.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, mintResponse.transaction.wait()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/, { initial: initial, mintResponse: mintResponse }];
                            }
                        });
                    }); });
                    sellAction = sellResponse.submit
                        .around(function (_a) {
                        var initial = _a.initial, mintResponse = _a.mintResponse;
                        return (tslib_1.__assign(tslib_1.__assign({}, initial), { itemId: mintResponse.itemId, amount: initial.supply }));
                    }, function (orderId, _a) {
                        var mintResponse = _a.mintResponse;
                        return (tslib_1.__assign(tslib_1.__assign({}, mintResponse), { orderId: orderId }));
                    });
                    return [2 /*return*/, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, mintResponse), sellResponse), { submit: mintAction.thenAction(sellAction) })];
            }
        });
    }); };
}
function getCollectionId(req) {
    if ("collection" in req) {
        return req.collection.id;
    }
    return req.collectionId;
}
exports.getCollectionId = getCollectionId;
function getBlockchainCollectionId(contract) {
    var _a = tslib_1.__read(contract.split(":"), 1), blockchain = _a[0];
    if (!(blockchain in api_client_1.Blockchain)) {
        throw new Error("Unrecognized blockchain in contract ".concat(contract));
    }
    return blockchain;
}
var balance_simple_1 = require("./sdk-blockchains/flow/balance-simple");
Object.defineProperty(exports, "getSimpleFlowFungibleBalance", { enumerable: true, get: function () { return balance_simple_1.getSimpleFlowFungibleBalance; } });
var common_1 = require("./sdk-blockchains/ethereum/common");
Object.defineProperty(exports, "isEVMBlockchain", { enumerable: true, get: function () { return common_1.isEVMBlockchain; } });
