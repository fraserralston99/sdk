"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnionSdk = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var action_1 = require("@rarible/action");
var index_1 = require("../../index");
var middleware_1 = require("../../common/middleware/middleware");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
function createUnionSdk(ethereum, flow, tezos, polygon, solana, immutablex) {
    return {
        balances: new UnionBalanceSdk({
            ETHEREUM: ethereum.balances,
            FLOW: flow.balances,
            TEZOS: tezos.balances,
            POLYGON: polygon.balances,
            SOLANA: solana.balances,
            IMMUTABLEX: immutablex.balances,
        }),
        nft: new UnionNftSdk({
            ETHEREUM: ethereum.nft,
            FLOW: flow.nft,
            TEZOS: tezos.nft,
            POLYGON: polygon.nft,
            SOLANA: solana.nft,
            IMMUTABLEX: immutablex.nft,
        }),
        order: new UnionOrderSdk({
            ETHEREUM: ethereum.order,
            FLOW: flow.order,
            TEZOS: tezos.order,
            POLYGON: polygon.order,
            SOLANA: solana.order,
            IMMUTABLEX: immutablex.order,
        }),
        restriction: new UnionRestrictionSdk({
            ETHEREUM: ethereum.restriction,
            FLOW: flow.restriction,
            TEZOS: tezos.restriction,
            POLYGON: polygon.restriction,
            SOLANA: solana.restriction,
            IMMUTABLEX: immutablex.restriction,
        }),
        ethereum: new UnionEthereumSpecificSdk(ethereum.ethereum),
    };
}
exports.createUnionSdk = createUnionSdk;
var UnionOrderSdk = /** @class */ (function () {
    function UnionOrderSdk(instances) {
        var _this = this;
        this.instances = instances;
        this.cancel = action_1.Action.create({
            id: "send-tx",
            run: function (value) { return _this.instances[extractBlockchain(value.orderId)].cancel(value); },
        });
        this.bid = this.bid.bind(this);
        this.bidUpdate = this.bidUpdate.bind(this);
        this.fill = this.fill.bind(this);
        this.buy = this.buy.bind(this);
        this.acceptBid = this.acceptBid.bind(this);
        this.sell = this.sell.bind(this);
        this.sellUpdate = this.sellUpdate.bind(this);
    }
    UnionOrderSdk.prototype.bid = function (request) {
        return this.instances[extractBlockchain(getBidEntity(request))].bid(request);
    };
    UnionOrderSdk.prototype.bidUpdate = function (request) {
        return this.instances[extractBlockchain(request.orderId)].bidUpdate(request);
    };
    /**
     * @deprecated
     * @param request
     */
    UnionOrderSdk.prototype.fill = function (request) {
        return this.instances[extractBlockchain(getOrderId(request))].fill(request);
    };
    UnionOrderSdk.prototype.buy = function (request) {
        return this.instances[extractBlockchain(getOrderId(request))].buy(request);
    };
    UnionOrderSdk.prototype.acceptBid = function (request) {
        return this.instances[extractBlockchain(getOrderId(request))].acceptBid(request);
    };
    UnionOrderSdk.prototype.sell = function (request) {
        return this.instances[request.blockchain].sell(request);
    };
    UnionOrderSdk.prototype.sellUpdate = function (request) {
        return this.instances[extractBlockchain(request.orderId)].sellUpdate(request);
    };
    return UnionOrderSdk;
}());
function getOrderId(req) {
    if ("orderId" in req) {
        return req.orderId;
    }
    else {
        return req.order.id;
    }
}
var UnionNftSdk = /** @class */ (function () {
    function UnionNftSdk(instances) {
        var _this = this;
        this.instances = instances;
        this.createCollection = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return _this.instances[request.blockchain].createCollection(request); },
        });
        this.deploy = this.createCollection;
        this.burn = this.burn.bind(this);
        this.mint = this.mint.bind(this);
        this.transfer = this.transfer.bind(this);
        this.preprocessMeta = middleware_1.Middlewarer.skipMiddleware(this.preprocessMeta.bind(this));
        this.generateTokenId = this.generateTokenId.bind(this);
        this.uploadMeta = this.uploadMeta.bind(this);
    }
    UnionNftSdk.prototype.burn = function (request) {
        return this.instances[extractBlockchain(request.itemId)].burn(request);
    };
    UnionNftSdk.prototype.uploadMeta = function (request) {
        return this.instances[extractBlockchain(request.accountAddress)].uploadMeta(request);
    };
    UnionNftSdk.prototype.mint = function (request) {
        var collectionId = (0, index_1.getCollectionId)(request);
        return this.instances[extractBlockchain(collectionId)].mint(request);
    };
    UnionNftSdk.prototype.transfer = function (request) {
        return this.instances[extractBlockchain(request.itemId)].transfer(request);
    };
    UnionNftSdk.prototype.generateTokenId = function (prepare) {
        return this.instances[extractBlockchain(prepare.collection)].generateTokenId(prepare);
    };
    UnionNftSdk.prototype.preprocessMeta = function (request) {
        return this.instances[request.blockchain].preprocessMeta(request);
    };
    return UnionNftSdk;
}());
var UnionBalanceSdk = /** @class */ (function () {
    function UnionBalanceSdk(instances) {
        var _this = this;
        this.instances = instances;
        this.depositBiddingBalance = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return _this.instances[getBiddingBlockchain(request)].depositBiddingBalance(request); },
        });
        this.withdrawBiddingBalance = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return _this.instances[getBiddingBlockchain(request)].withdrawBiddingBalance(request); },
        });
        this.getBalance = this.getBalance.bind(this);
        this.convert = this.convert.bind(this);
        this.getBiddingBalance = this.getBiddingBalance.bind(this);
    }
    UnionBalanceSdk.prototype.getBalance = function (address, currency) {
        return this.instances[getBalanceBlockchain(address, currency)].getBalance(address, currency);
    };
    UnionBalanceSdk.prototype.convert = function (request) {
        return this.instances[request.blockchain].convert(request);
    };
    UnionBalanceSdk.prototype.getBiddingBalance = function (request) {
        return this.instances[getBiddingBlockchain(request)].getBiddingBalance(request);
    };
    return UnionBalanceSdk;
}());
var UnionRestrictionSdk = /** @class */ (function () {
    function UnionRestrictionSdk(instances) {
        this.instances = instances;
    }
    UnionRestrictionSdk.prototype.canTransfer = function (itemId, from, to) {
        return this.instances[extractBlockchain(itemId)].canTransfer(itemId, from, to);
    };
    return UnionRestrictionSdk;
}());
var UnionEthereumSpecificSdk = /** @class */ (function () {
    function UnionEthereumSpecificSdk(ethereumSdk) {
        this.ethereumSdk = ethereumSdk;
        this.wrapCryptoPunk = this.ethereumSdk.wrapCryptoPunk;
        this.unwrapCryptoPunk = this.ethereumSdk.unwrapCryptoPunk;
    }
    return UnionEthereumSpecificSdk;
}());
var blockchains = [
    api_client_1.Blockchain.ETHEREUM,
    api_client_1.Blockchain.FLOW,
    api_client_1.Blockchain.TEZOS,
    api_client_1.Blockchain.POLYGON,
    api_client_1.Blockchain.SOLANA,
];
function extractBlockchain(value) {
    var e_1, _a;
    var idx = value.indexOf(":");
    if (idx === -1) {
        throw new Error("Unable to extract blockchain from ".concat(value));
    }
    var start = value.substring(0, idx);
    try {
        for (var blockchains_1 = tslib_1.__values(blockchains), blockchains_1_1 = blockchains_1.next(); !blockchains_1_1.done; blockchains_1_1 = blockchains_1.next()) {
            var blockchain = blockchains_1_1.value;
            if (blockchain === start) {
                return blockchain;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (blockchains_1_1 && !blockchains_1_1.done && (_a = blockchains_1.return)) _a.call(blockchains_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    throw new Error("Unable to extract blockchain from ".concat(value));
}
function getBidEntity(request) {
    if ("itemId" in request) {
        return request.itemId;
    }
    else if ("collectionId" in request) {
        return request.collectionId;
    }
    else {
        throw new Error("Bit request should contains itemId or collectionId");
    }
}
function getBalanceBlockchain(address, currency) {
    if ((0, get_currency_asset_type_1.isAssetType)(currency)) {
        if ("blockchain" in currency && currency.blockchain) {
            return currency.blockchain;
        }
        if ("contract" in currency && currency.contract) {
            return extractBlockchain(currency.contract);
        }
        return extractBlockchain(address);
    }
    else if ((0, get_currency_asset_type_1.isRequestCurrencyAssetType)(currency)) {
        var blockchain = (0, get_currency_asset_type_1.getDataFromCurrencyId)(currency).blockchain;
        return blockchain;
    }
    else {
        throw new Error("Unrecognized RequestCurrency ".concat(JSON.stringify(currency)));
    }
}
function getBiddingBlockchain(currencyOrOrder) {
    if ("currency" in currencyOrOrder) {
        if ((0, get_currency_asset_type_1.isRequestCurrencyAssetType)(currencyOrOrder.currency)) {
            return extractBlockchain(currencyOrOrder.currency);
        }
        else {
            if ((0, get_currency_asset_type_1.isAssetType)(currencyOrOrder.currency)) {
                if ("blockchain" in currencyOrOrder.currency && currencyOrOrder.currency.blockchain) {
                    return currencyOrOrder.currency.blockchain;
                }
                if ("contract" in currencyOrOrder.currency && currencyOrOrder.currency.contract) {
                    return extractBlockchain(currencyOrOrder.currency.contract);
                }
                if ("itemId" in currencyOrOrder.currency && currencyOrOrder.currency.itemId) {
                    return extractBlockchain(currencyOrOrder.currency.itemId);
                }
                switch (currencyOrOrder.currency["@type"]) {
                    case "SOLANA_SOL": return api_client_1.Blockchain.SOLANA;
                    case "ETH": return api_client_1.Blockchain.ETHEREUM;
                    case "XTZ": return api_client_1.Blockchain.TEZOS;
                }
            }
        }
        throw new Error("Unrecognized RequestCurrency ".concat(JSON.stringify(currencyOrOrder.currency)));
    }
    else if ("order" in currencyOrOrder) {
        return extractBlockchain(currencyOrOrder.order.id);
    }
    else if ("orderId" in currencyOrOrder) {
        return extractBlockchain(currencyOrOrder.orderId);
    }
    else {
        return currencyOrOrder.blockchain;
    }
}
