"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFlowWallet = void 0;
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
function mapFlowWallet(provider) {
    return provider.map(function (state) { return ({
        wallet: new sdk_wallet_1.FlowWallet(state.fcl),
        address: state.address,
        blockchain: api_client_1.Blockchain.FLOW,
    }); });
}
exports.mapFlowWallet = mapFlowWallet;
