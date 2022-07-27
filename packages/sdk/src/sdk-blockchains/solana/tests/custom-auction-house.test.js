"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var auction_house_1 = require("../common/auction-house");
describe("Solana Auction House registry", function () {
    var auctionHouseMapping = {
        "SOLANA_SOL": {
            address: "raria47jXd4tdW6Dj7T64mgahwTjMsVaDwFxMHt9Jbp",
            baseFee: 0,
        },
        "3PexEZ782MHJQo2wspNv3oBF44Lgd3Ph8tT9J4poCwDk": {
            address: "5b8aRKt9E1nAZjVVF7nkA2jJf3zeDiAPXVktT2zbxFzH",
            baseFee: 4000,
        },
    };
    test("Should return correct Auction House with no mapping", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ah, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ah = (0, auction_house_1.getAuctionHouse)({ "@type": "SOLANA_SOL" }, undefined);
                    expect(ah.toString()).toEqual("raria47jXd4tdW6Dj7T64mgahwTjMsVaDwFxMHt9Jbp");
                    _a = expect;
                    return [4 /*yield*/, (0, auction_house_1.getAuctionHouseFee)(ah, undefined)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should throw when no Auction House specified for given currency", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var req;
        return tslib_1.__generator(this, function (_a) {
            req = function () { return (0, auction_house_1.getAuctionHouse)({
                "@type": "SOLANA_NFT",
                itemId: (0, types_1.toItemId)("SOLANA:mintmintmintmintmintyiBGnLSpookWQiwLMvFn4NFm"),
            }, undefined); };
            expect(req).toThrow("Auction House for specified currency not found");
            return [2 /*return*/];
        });
    }); });
    test("Should return correct Auction House with mapping", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ah, fee, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ah = (0, auction_house_1.getAuctionHouse)({ "@type": "SOLANA_SOL" }, auctionHouseMapping);
                    expect(ah.toString()).toEqual("raria47jXd4tdW6Dj7T64mgahwTjMsVaDwFxMHt9Jbp");
                    return [4 /*yield*/, (0, auction_house_1.getAuctionHouseFee)(ah, auctionHouseMapping)];
                case 1:
                    fee = _b.sent();
                    expect(fee).toEqual(0);
                    ah = (0, auction_house_1.getAuctionHouse)({
                        "@type": "SOLANA_NFT",
                        itemId: (0, types_1.toItemId)("SOLANA:3PexEZ782MHJQo2wspNv3oBF44Lgd3Ph8tT9J4poCwDk"),
                    }, auctionHouseMapping);
                    // use custom ah for registered mint
                    expect(ah.toString()).toEqual("5b8aRKt9E1nAZjVVF7nkA2jJf3zeDiAPXVktT2zbxFzH");
                    _a = expect;
                    return [4 /*yield*/, (0, auction_house_1.getAuctionHouseFee)(ah, auctionHouseMapping)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toEqual(4000);
                    return [2 /*return*/];
            }
        });
    }); });
});
