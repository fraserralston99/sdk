"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToWeb3 = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connection_state_1 = require("../../../connection-state");
var get_address_1 = require("./get-address");
var get_chain_id_1 = require("./get-chain-id");
var get_connected_status_1 = require("./get-connected-status");
function connectToWeb3(provider, options) {
    if (options === void 0) { options = {}; }
    return (0, rxjs_1.combineLatest)([
        (0, get_address_1.getAddress)(provider),
        (0, get_chain_id_1.getChainId)(provider),
        (0, get_connected_status_1.getConnectedStatus)(provider),
    ]).pipe((0, operators_1.distinctUntilChanged)(function (c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
    }), (0, operators_1.map)(function (_a) {
        var _b = tslib_1.__read(_a, 3), address = _b[0], chainId = _b[1], status = _b[2];
        if (status === "connected" && address) {
            var wallet = {
                chainId: chainId,
                address: address,
                provider: provider,
                disconnect: options.disconnect,
            };
            return (0, connection_state_1.getStateConnected)({ connection: wallet });
        }
        else {
            return (0, connection_state_1.getStateDisconnected)();
        }
    }));
}
exports.connectToWeb3 = connectToWeb3;
