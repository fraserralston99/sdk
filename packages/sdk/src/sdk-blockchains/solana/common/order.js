"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokensAmount = exports.getPrice = exports.getItemId = exports.getMintId = exports.getOrderData = exports.getPreparedOrder = exports.getOrderId = void 0;
var tslib_1 = require("tslib");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var keccak256_1 = require("@ethersproject/keccak256");
var types_1 = require("@rarible/types");
var address_converters_1 = require("./address-converters");
function getOrderId(orderType, maker, itemId, auctionHouse) {
    var data = new TextEncoder().encode(maker + itemId + orderType + auctionHouse);
    return (0, types_1.toOrderId)("SOLANA:" + (0, keccak256_1.keccak256)(data));
}
exports.getOrderId = getOrderId;
function getPreparedOrder(request, apis) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if ("order" in request) {
                return [2 /*return*/, request.order];
            }
            if ("orderId" in request) {
                return [2 /*return*/, apis.order.getOrderById({ id: request.orderId })];
            }
            throw new Error("Incorrect request");
        });
    });
}
exports.getPreparedOrder = getPreparedOrder;
function getOrderData(order) {
    var _a;
    if (((_a = order.data) === null || _a === void 0 ? void 0 : _a["@type"]) === "SOLANA_AUCTION_HOUSE_V1") {
        return order.data;
    }
    else {
        throw new Error("Not an auction house order");
    }
}
exports.getOrderData = getOrderData;
function getMintId(order) {
    if (order.make.type["@type"] === "SOLANA_NFT") {
        return (0, address_converters_1.extractPublicKey)(order.make.type.itemId);
    }
    else if (order.take.type["@type"] === "SOLANA_NFT") {
        return (0, address_converters_1.extractPublicKey)(order.take.type.itemId);
    }
    throw new Error("Unsupported type");
}
exports.getMintId = getMintId;
function getItemId(mint) {
    return (0, types_1.toItemId)("SOLANA:" + mint.toString());
}
exports.getItemId = getItemId;
function getPrice(order) {
    if (order.take.type["@type"] === "SOLANA_SOL") {
        return new bignumber_js_1.default(order.take.value);
    }
    else if (order.make.type["@type"] === "SOLANA_SOL") {
        return new bignumber_js_1.default(order.make.value);
    }
    throw new Error("Unsupported currency type");
}
exports.getPrice = getPrice;
function getTokensAmount(order) {
    if (order.make.type["@type"] === "SOLANA_NFT") {
        return new bignumber_js_1.default(order.make.value);
    }
    else if (order.take.type["@type"] === "SOLANA_NFT") {
        return new bignumber_js_1.default(order.take.value);
    }
    throw new Error("Unsupported asset type");
}
exports.getTokensAmount = getTokensAmount;
