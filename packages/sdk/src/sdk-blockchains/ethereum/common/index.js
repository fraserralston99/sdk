"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthereumItemId = exports.convertEthereumItemId = exports.convertEthereumToUnionAddress = exports.convertEthereumCollectionId = exports.convertEthereumContractAddress = exports.convertOrderIdToEthereumHash = exports.convertEthereumOrderHash = exports.convertToEthereumAddress = exports.isEVMBlockchain = exports.getSupportedCurrencies = exports.getEVMBlockchain = exports.getPayoutsSupport = exports.getOriginFeeSupport = exports.getOrderFeesSum = exports.getOriginFeesSum = exports.toEthereumParts = exports.convertToEthereumAssetType = exports.getEthTakeAssetType = exports.EVMBlockchains = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var blockchains_1 = require("@rarible/types/build/blockchains");
var api_client_1 = require("@rarible/api-client");
var bn_1 = require("@rarible/utils/build/bn");
var domain_1 = require("../../../types/order/fill/domain");
exports.EVMBlockchains = [
    api_client_1.Blockchain.ETHEREUM,
    api_client_1.Blockchain.POLYGON,
];
function getEthTakeAssetType(currency) {
    switch (currency["@type"]) {
        case "ERC20":
            return {
                assetClass: currency["@type"],
                contract: convertToEthereumAddress(currency.contract),
            };
        case "ETH":
            return {
                assetClass: currency["@type"],
            };
        default:
            throw new Error("Invalid take asset type");
    }
}
exports.getEthTakeAssetType = getEthTakeAssetType;
function convertToEthereumAssetType(assetType) {
    switch (assetType["@type"]) {
        case "ETH": {
            return { assetClass: "ETH" };
        }
        case "ERC20": {
            return {
                assetClass: "ERC20",
                contract: convertToEthereumAddress(assetType.contract),
            };
        }
        case "ERC721": {
            return {
                assetClass: "ERC721",
                contract: convertToEthereumAddress(assetType.contract),
                tokenId: assetType.tokenId,
            };
        }
        case "ERC721_Lazy": {
            return {
                assetClass: "ERC721_LAZY",
                contract: convertToEthereumAddress(assetType.contract),
                tokenId: assetType.tokenId,
                uri: assetType.uri,
                creators: assetType.creators.map(function (c) { return ({
                    account: convertToEthereumAddress(c.account),
                    value: (0, bn_1.toBn)(c.value).toNumber(),
                }); }),
                royalties: assetType.royalties.map(function (r) { return ({
                    account: convertToEthereumAddress(r.account),
                    value: (0, bn_1.toBn)(r.value).toNumber(),
                }); }),
                signatures: assetType.signatures.map(function (str) { return (0, types_1.toBinary)(str); }),
            };
        }
        case "ERC1155": {
            return {
                assetClass: "ERC1155",
                contract: convertToEthereumAddress(assetType.contract),
                tokenId: assetType.tokenId,
            };
        }
        case "ERC1155_Lazy": {
            return {
                assetClass: "ERC1155_LAZY",
                contract: convertToEthereumAddress(assetType.contract),
                tokenId: assetType.tokenId,
                uri: assetType.uri,
                supply: assetType.supply !== undefined ? (0, types_1.toBigNumber)(assetType.supply) : (0, types_1.toBigNumber)("1"),
                creators: assetType.creators.map(function (c) { return ({
                    account: convertToEthereumAddress(c.account),
                    value: (0, bn_1.toBn)(c.value).toNumber(),
                }); }),
                royalties: assetType.royalties.map(function (r) { return ({
                    account: convertToEthereumAddress(r.account),
                    value: (0, bn_1.toBn)(r.value).toNumber(),
                }); }),
                signatures: assetType.signatures.map(function (str) { return (0, types_1.toBinary)(str); }),
            };
        }
        case "CRYPTO_PUNKS": {
            return {
                assetClass: "CRYPTO_PUNKS",
                contract: convertToEthereumAddress(assetType.contract),
                tokenId: assetType.tokenId,
            };
        }
        case "GEN_ART": {
            return {
                assetClass: "GEN_ART",
                contract: convertToEthereumAddress(assetType.contract),
            };
        }
        default: {
            throw new Error("Unsupported asset type=".concat(assetType["@type"]));
        }
    }
}
exports.convertToEthereumAssetType = convertToEthereumAssetType;
function toEthereumParts(parts) {
    return (parts === null || parts === void 0 ? void 0 : parts.map(function (part) { return ({
        account: convertToEthereumAddress(part.account),
        value: part.value,
    }); })) || [];
}
exports.toEthereumParts = toEthereumParts;
function getOriginFeesSum(originFees) {
    return originFees.reduce(function (acc, fee) { return fee.value; }, 0);
}
exports.getOriginFeesSum = getOriginFeesSum;
function getOrderFeesSum(order) {
    switch (order.data.dataType) {
        case "LEGACY":
            return order.data.fee;
        case "RARIBLE_V2_DATA_V1":
            return getOriginFeesSum(order.data.originFees);
        case "RARIBLE_V2_DATA_V2":
            return getOriginFeesSum(order.data.originFees);
        default:
            throw new Error("Unexpected order dataType");
    }
}
exports.getOrderFeesSum = getOrderFeesSum;
function getOriginFeeSupport(type) {
    switch (type) {
        case "RARIBLE_V1":
            return domain_1.OriginFeeSupport.AMOUNT_ONLY;
        case "RARIBLE_V2":
            return domain_1.OriginFeeSupport.FULL;
        default:
            throw new Error("Unknown order type " + type);
    }
}
exports.getOriginFeeSupport = getOriginFeeSupport;
function getPayoutsSupport(type) {
    switch (type) {
        case "RARIBLE_V1":
            return domain_1.PayoutsSupport.SINGLE;
        case "RARIBLE_V2":
            return domain_1.PayoutsSupport.MULTIPLE;
        default:
            throw new Error("Unknown order type " + type);
    }
}
exports.getPayoutsSupport = getPayoutsSupport;
function getEVMBlockchain(network) {
    switch (network) {
        case "testnet":
            return api_client_1.Blockchain.ETHEREUM;
        case "ropsten":
            return api_client_1.Blockchain.ETHEREUM;
        case "dev-ethereum":
            return api_client_1.Blockchain.ETHEREUM;
        case "dev-polygon":
            return api_client_1.Blockchain.POLYGON;
        case "rinkeby":
            return api_client_1.Blockchain.ETHEREUM;
        case "mainnet":
            return api_client_1.Blockchain.ETHEREUM;
        case "mumbai":
            return api_client_1.Blockchain.POLYGON;
        case "mumbai-dev":
            return api_client_1.Blockchain.POLYGON;
        case "polygon":
            return api_client_1.Blockchain.POLYGON;
        default:
            throw new Error("Unsupported network: ".concat(network));
    }
}
exports.getEVMBlockchain = getEVMBlockchain;
function getSupportedCurrencies(blockchain, forBids) {
    if (blockchain === void 0) { blockchain = api_client_1.Blockchain.ETHEREUM; }
    if (forBids === void 0) { forBids = false; }
    if (forBids) {
        return [{ blockchain: blockchain, type: "ERC20" }];
    }
    return [
        { blockchain: blockchain, type: "NATIVE" },
        { blockchain: blockchain, type: "ERC20" },
    ];
}
exports.getSupportedCurrencies = getSupportedCurrencies;
function isEVMBlockchain(blockchain) {
    var e_1, _a;
    try {
        for (var EVMBlockchains_1 = tslib_1.__values(exports.EVMBlockchains), EVMBlockchains_1_1 = EVMBlockchains_1.next(); !EVMBlockchains_1_1.done; EVMBlockchains_1_1 = EVMBlockchains_1.next()) {
            var b = EVMBlockchains_1_1.value;
            if (b === blockchain) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (EVMBlockchains_1_1 && !EVMBlockchains_1_1.done && (_a = EVMBlockchains_1.return)) _a.call(EVMBlockchains_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}
exports.isEVMBlockchain = isEVMBlockchain;
function convertToEthereumAddress(contractAddress) {
    if (!(0, blockchains_1.isRealBlockchainSpecified)(contractAddress)) {
        throw new Error("Not a union or contract address: " + contractAddress);
    }
    var _a = tslib_1.__read(contractAddress.split(":"), 2), blockchain = _a[0], address = _a[1];
    if (!isEVMBlockchain(blockchain)) {
        throw new Error("Not an Ethereum address");
    }
    return (0, types_1.toAddress)(address);
}
exports.convertToEthereumAddress = convertToEthereumAddress;
function convertEthereumOrderHash(hash, blockchain) {
    return (0, types_1.toOrderId)("".concat(blockchain, ":").concat(hash));
}
exports.convertEthereumOrderHash = convertEthereumOrderHash;
function convertOrderIdToEthereumHash(orderId) {
    if (!(0, blockchains_1.isRealBlockchainSpecified)(orderId)) {
        throw new Error("Blockchain is not correct=".concat(orderId));
    }
    var _a = tslib_1.__read(orderId.split(":"), 2), blockchain = _a[0], orderHash = _a[1];
    if (!isEVMBlockchain(blockchain)) {
        throw new Error("Not an Ethereum address");
    }
    return orderHash;
}
exports.convertOrderIdToEthereumHash = convertOrderIdToEthereumHash;
function convertEthereumContractAddress(address, blockchain) {
    return (0, types_1.toContractAddress)("".concat(blockchain, ":").concat(address));
}
exports.convertEthereumContractAddress = convertEthereumContractAddress;
function convertEthereumCollectionId(address, blockchain) {
    return (0, types_1.toCollectionId)("".concat(blockchain, ":").concat(address));
}
exports.convertEthereumCollectionId = convertEthereumCollectionId;
function convertEthereumToUnionAddress(address, blockchain) {
    return (0, types_1.toUnionAddress)("".concat(blockchain, ":").concat(address));
}
exports.convertEthereumToUnionAddress = convertEthereumToUnionAddress;
function convertEthereumItemId(itemId, blockchain) {
    return (0, types_1.toItemId)("".concat(blockchain, ":").concat(itemId));
}
exports.convertEthereumItemId = convertEthereumItemId;
function getEthereumItemId(itemId) {
    var _a = tslib_1.__read(itemId.split(":"), 3), domain = _a[0], contract = _a[1], tokenId = _a[2];
    if (!isEVMBlockchain(domain)) {
        throw new Error("Not an ethereum item: ".concat(itemId));
    }
    return {
        itemId: "".concat(contract, ":").concat(tokenId),
        contract: contract,
        tokenId: tokenId,
        domain: domain,
    };
}
exports.getEthereumItemId = getEthereumItemId;
tslib_1.__exportStar(require("./validators"), exports);
