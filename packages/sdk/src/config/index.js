"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFT_STORAGE_URL = exports.getSdkConfig = exports.configsDictionary = void 0;
var dev_1 = require("./dev");
var staging_1 = require("./staging");
var prod_1 = require("./prod");
var development_1 = require("./development");
var testnet_1 = require("./testnet");
exports.configsDictionary = {
    dev: dev_1.devConfig,
    development: development_1.developmentConfig,
    testnet: testnet_1.testnetConfig,
    staging: staging_1.stagingConfig,
    prod: prod_1.prodConfig,
};
function getSdkConfig(env) {
    return exports.configsDictionary[env];
}
exports.getSdkConfig = getSdkConfig;
exports.NFT_STORAGE_URL = "https://api.nft.storage/upload";
