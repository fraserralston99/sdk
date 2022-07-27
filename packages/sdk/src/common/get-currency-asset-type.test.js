"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var get_currency_asset_type_1 = require("./get-currency-asset-type");
describe("test getCurrencyAssetType", function () {
    test("get eth asset type from asset type", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)({
                "@type": "ETH",
            });
            expect(assetType["@type"]).toEqual("ETH");
            return [2 /*return*/];
        });
    }); });
    test("get erc-20 asset type from asset type", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)({
                "@type": "ERC20",
                contract: (0, types_1.toContractAddress)("ETHEREUM:0x0000000000000000000000000000000000000001"),
            });
            expect(assetType["@type"]).toEqual("ERC20");
            expect(assetType.contract).toEqual("ETHEREUM:0x0000000000000000000000000000000000000001");
            return [2 /*return*/];
        });
    }); });
    test("get eth asset type from currency id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)((0, types_1.toCurrencyId)("ETHEREUM:".concat(types_1.ZERO_ADDRESS)));
            expect(assetType["@type"]).toEqual("ETH");
            expect(assetType.blockchain).toEqual(api_client_1.Blockchain.ETHEREUM);
            return [2 /*return*/];
        });
    }); });
    test("get polygon eth asset type from currency id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)((0, types_1.toCurrencyId)("POLYGON:".concat(types_1.ZERO_ADDRESS)));
            expect(assetType["@type"]).toEqual("ETH");
            expect(assetType.blockchain).toEqual(api_client_1.Blockchain.POLYGON);
            return [2 /*return*/];
        });
    }); });
    test("get erc-20 asset type from currency id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)((0, types_1.toCurrencyId)("ETHEREUM:0x0000000000000000000000000000000000000001"));
            expect(assetType["@type"]).toEqual("ERC20");
            expect(assetType.contract).toEqual("ETHEREUM:0x0000000000000000000000000000000000000001");
            return [2 /*return*/];
        });
    }); });
    test("get flow_ft asset type from currency id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)((0, types_1.toCurrencyId)("FLOW:A.7e60df042a9c0868.FlowToken"));
            expect(assetType["@type"]).toEqual("FLOW_FT");
            expect(assetType.contract).toEqual("FLOW:A.7e60df042a9c0868.FlowToken");
            return [2 /*return*/];
        });
    }); });
    test("get XTZ asset type from currency id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)((0, types_1.toCurrencyId)("TEZOS:tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU"));
            expect(assetType["@type"]).toEqual("XTZ");
            return [2 /*return*/];
        });
    }); });
    test("get tezos_ft asset type from currency id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var assetType;
        return tslib_1.__generator(this, function (_a) {
            assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)((0, types_1.toCurrencyId)("TEZOS:KT1Rgf9RNW7gLj7JGn98yyVM34S4St9eudMC:0"));
            expect(assetType["@type"]).toEqual("TEZOS_FT");
            expect(assetType.contract).toEqual("TEZOS:KT1Rgf9RNW7gLj7JGn98yyVM34S4St9eudMC");
            expect(assetType.tokenId).toEqual("0");
            return [2 /*return*/];
        });
    }); });
    test("test getDataFromCurrencyId with ETH", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, blockchain, contract, tokenId;
        return tslib_1.__generator(this, function (_b) {
            _a = (0, get_currency_asset_type_1.getDataFromCurrencyId)((0, types_1.toCurrencyId)("ETHEREUM:0x0000000000000000000000000000000000000000")), blockchain = _a.blockchain, contract = _a.contract, tokenId = _a.tokenId;
            expect(blockchain).toEqual(api_client_1.Blockchain.ETHEREUM);
            expect(contract).toEqual("0x0000000000000000000000000000000000000000");
            expect(tokenId).toEqual(undefined);
            return [2 /*return*/];
        });
    }); });
    test("test getDataFromCurrencyId with Ethereum ERC-20 contract", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, blockchain, contract, tokenId;
        return tslib_1.__generator(this, function (_b) {
            _a = (0, get_currency_asset_type_1.getDataFromCurrencyId)((0, types_1.toCurrencyId)("ETHEREUM:0x0000000000000000000000000000000000000001")), blockchain = _a.blockchain, contract = _a.contract, tokenId = _a.tokenId;
            expect(blockchain).toEqual(api_client_1.Blockchain.ETHEREUM);
            expect(contract).toEqual("0x0000000000000000000000000000000000000001");
            expect(tokenId).toEqual(undefined);
            return [2 /*return*/];
        });
    }); });
});
