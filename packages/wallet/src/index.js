"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImmutablexWallet = exports.SolanaWallet = exports.TezosWallet = exports.FlowWallet = exports.EthereumWallet = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var EthereumWallet = /** @class */ (function () {
    function EthereumWallet(ethereum) {
        this.ethereum = ethereum;
        this.blockchain = api_client_1.BlockchainGroup.ETHEREUM;
    }
    EthereumWallet.prototype.signPersonalMessage = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var address;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.ethereum.getFrom()];
                    case 1:
                        address = _b.sent();
                        if (!address) {
                            throw new Error("Not connected to Ethereum blockchain");
                        }
                        _a = {};
                        return [4 /*yield*/, this.ethereum.personalSign(message)];
                    case 2: return [2 /*return*/, (_a.signature = _b.sent(),
                            _a.publicKey = address,
                            _a)];
                }
            });
        });
    };
    return EthereumWallet;
}());
exports.EthereumWallet = EthereumWallet;
var FlowWallet = /** @class */ (function () {
    function FlowWallet(fcl, auth) {
        this.fcl = fcl;
        this.auth = auth;
        this.blockchain = api_client_1.BlockchainGroup.FLOW;
    }
    FlowWallet.prototype.getAuth = function () {
        return this.auth;
    };
    FlowWallet.prototype.signPersonalMessage = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var messageHex, currentUser, user, address, account, signatures, signature, pubKey;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!message.length) {
                            throw new Error("Message can't be empty");
                        }
                        messageHex = Buffer.from(message).toString("hex");
                        currentUser = this.fcl.currentUser();
                        return [4 /*yield*/, this.fcl.currentUser().snapshot()];
                    case 1:
                        user = _a.sent();
                        address = user.addr;
                        if (!address) {
                            throw new Error("Not connected to Flow blockchain");
                        }
                        return [4 /*yield*/, this.fcl.account(address)];
                    case 2:
                        account = _a.sent();
                        return [4 /*yield*/, currentUser.signUserMessage(messageHex)];
                    case 3:
                        signatures = _a.sent();
                        if (typeof signatures === "string") {
                            throw new Error(signatures);
                        }
                        signature = signatures.find(function (s) {
                            return s.addr.toLowerCase() === address.toLowerCase();
                        });
                        if (signature) {
                            pubKey = account.keys.find(function (k) { return k.index === signature.keyId; });
                            if (!pubKey) {
                                throw new Error("Key with index \"".concat(signature.keyId, "\" not found on account with address ").concat(address));
                            }
                            return [2 /*return*/, {
                                    signature: signature.signature,
                                    publicKey: pubKey.publicKey,
                                }];
                        }
                        throw new Error("Signature of user address \"".concat(address, "\" not found"));
                }
            });
        });
    };
    return FlowWallet;
}());
exports.FlowWallet = FlowWallet;
var TezosWallet = /** @class */ (function () {
    function TezosWallet(provider) {
        this.provider = provider;
        this.blockchain = api_client_1.BlockchainGroup.TEZOS;
    }
    TezosWallet.prototype.sign = function (p, message, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var edpk, r;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = type || "message";
                        return [4 /*yield*/, p.public_key()];
                    case 1:
                        edpk = _a.sent();
                        if (edpk === undefined)
                            throw new Error("cannot get public key from provider");
                        return [4 /*yield*/, p.sign(message, type)];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, tslib_1.__assign({ edpk: edpk }, r)];
                }
            });
        });
    };
    TezosWallet.prototype.signPersonalMessage = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var publicKey, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.public_key()];
                    case 1:
                        publicKey = _a.sent();
                        if (publicKey === undefined) {
                            throw new Error("Public key undefined");
                        }
                        return [4 /*yield*/, this.sign(this.provider, message, "message")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                signature: result.signature,
                                publicKey: "".concat(result.edpk, "_").concat(result.prefix),
                            }];
                }
            });
        });
    };
    return TezosWallet;
}());
exports.TezosWallet = TezosWallet;
var SolanaWallet = /** @class */ (function () {
    function SolanaWallet(provider) {
        this.provider = provider;
        this.blockchain = api_client_1.BlockchainGroup.SOLANA;
    }
    SolanaWallet.prototype.signPersonalMessage = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = new TextEncoder().encode(message);
                        return [4 /*yield*/, this.provider.signMessage(data, "utf8")];
                    case 1:
                        res = _a.sent();
                        if (res.signature) { // phantom wallet response
                            return [2 /*return*/, {
                                    signature: Buffer.from(res.signature).toString("hex"),
                                    publicKey: res.publicKey.toString(),
                                }];
                        }
                        else { // solflare wallet response
                            return [2 /*return*/, {
                                    signature: Buffer.from(res).toString("hex"),
                                    publicKey: this.provider.publicKey.toString(),
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SolanaWallet;
}());
exports.SolanaWallet = SolanaWallet;
//todo implement immutablex wallet
var ImmutablexWallet = /** @class */ (function () {
    function ImmutablexWallet() {
        this.blockchain = api_client_1.BlockchainGroup.IMMUTABLEX;
    }
    //todo implement sign personal message method
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ImmutablexWallet.prototype.signPersonalMessage = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, {
                        signature: "",
                        publicKey: "",
                    }];
            });
        });
    };
    return ImmutablexWallet;
}());
exports.ImmutablexWallet = ImmutablexWallet;
