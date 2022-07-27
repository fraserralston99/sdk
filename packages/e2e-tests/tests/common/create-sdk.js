"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSdk = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var sdk_1 = require("@rarible/sdk");
var domain_1 = require("@rarible/sdk/build/domain");
var config_1 = require("./config");
function createSdk(blockchain, wallet) {
    var env = config_1.testsConfig.env;
    var flowAuth = undefined;
    switch (blockchain) {
        case api_client_1.Blockchain.FLOW:
            env = "development";
            flowAuth = wallet.blockchain === api_client_1.BlockchainGroup.FLOW ? wallet.getAuth() : undefined;
            break;
        default:
    }
    return (0, sdk_1.createRaribleSdk)(wallet, env, tslib_1.__assign({ logs: domain_1.LogsLevel.DISABLED }, flowAuth ? {
        flow: {
            auth: flowAuth,
        },
    } : {}));
}
exports.createSdk = createSdk;
