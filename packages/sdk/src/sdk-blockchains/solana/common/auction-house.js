"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuctionHouseFee = exports.getAuctionHouse = void 0;
var tslib_1 = require("tslib");
var solana_common_1 = require("@rarible/solana-common");
var address_converters_1 = require("./address-converters");
var auctionHouseFee = {
    "raria47jXd4tdW6Dj7T64mgahwTjMsVaDwFxMHt9Jbp": 0, // base points (250 = 2.5%)
};
function getAuctionHouse(currency, auctionHouseMapping) {
    if (currency["@type"] === "SOLANA_SOL") {
        if (auctionHouseMapping && auctionHouseMapping["SOLANA_SOL"]) {
            return (0, solana_common_1.toPublicKey)(auctionHouseMapping["SOLANA_SOL"].address);
        }
        return (0, solana_common_1.toPublicKey)("raria47jXd4tdW6Dj7T64mgahwTjMsVaDwFxMHt9Jbp");
    }
    else if (currency["@type"] === "SOLANA_NFT") {
        var mintAddress = (0, address_converters_1.extractAddress)(currency.itemId);
        if (auctionHouseMapping && auctionHouseMapping[mintAddress]) {
            return (0, solana_common_1.toPublicKey)(auctionHouseMapping[mintAddress].address);
        }
    }
    throw new Error("Auction House for specified currency not found");
}
exports.getAuctionHouse = getAuctionHouse;
function getAuctionHouseFee(ah, auctionHouseMapping) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ahAddress, ahRecord;
        return tslib_1.__generator(this, function (_a) {
            ahAddress = ah.toString();
            if (auctionHouseMapping) {
                ahRecord = Object.values(auctionHouseMapping)
                    .find(function (record) { return record.address === ahAddress; });
                if (ahRecord) {
                    return [2 /*return*/, ahRecord.baseFee];
                }
            }
            if (auctionHouseFee[ahAddress] === undefined) {
                throw new Error("No fee info found for specified Auction House");
            }
            return [2 /*return*/, auctionHouseFee[ahAddress]];
        });
    });
}
exports.getAuctionHouseFee = getAuctionHouseFee;
