"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaSdk = void 0;
var web3_js_1 = require("@solana/web3.js");
var debug_logger_1 = require("../logger/debug-logger");
var transactions_1 = require("../common/transactions");
var balance_1 = require("./balance/balance");
var nft_1 = require("./nft/nft");
var order_1 = require("./order/order");
var collection_1 = require("./collection/collection");
var auction_house_1 = require("./auctionHouse/auction-house");
var account_1 = require("./account/account");
var SolanaSdk = /** @class */ (function () {
    function SolanaSdk(connection, cluster, logging) {
        this.connection = connection;
        this.cluster = cluster;
        this.logging = logging;
        this.debugLogger = new debug_logger_1.DebugLogger(logging.debug);
        this.account = new account_1.SolanaAccountSdk(connection, this.debugLogger);
        this.balances = new balance_1.SolanaBalancesSdk(connection, this.debugLogger);
        this.nft = new nft_1.SolanaNftSdk(connection, this.debugLogger, this.account);
        this.order = new order_1.SolanaOrderSdk(connection, this.debugLogger);
        this.collection = new collection_1.SolanaCollectionSdk(connection, this.debugLogger);
        this.auctionHouse = new auction_house_1.SolanaAuctionHouseSdk(connection, this.debugLogger);
    }
    SolanaSdk.prototype.confirmTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this.connection).confirmTransaction.apply(_a, args);
    };
    SolanaSdk.prototype.unionInstructionsAndSend = function (signer, preparedTransactions, commitment) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetry)(this.connection, signer, preparedTransactions.reduce(function (acc, trans) {
                            acc.push.apply(acc, trans.data.instructions);
                            return acc;
                        }, []), preparedTransactions.reduce(function (acc, trans) {
                            acc.push.apply(acc, trans.data.signers);
                            return acc;
                        }, []), commitment, this.debugLogger)];
                    case 1:
                        res = _a.sent();
                        preparedTransactions.forEach(function (trans) {
                            var _a;
                            (_a = trans.onSubmit) === null || _a === void 0 ? void 0 : _a.call(trans, res);
                        });
                        return [2 /*return*/, res];
                }
            });
        });
    };
    SolanaSdk.create = function (config) {
        var _a, _b;
        var connection = new web3_js_1.Connection((_a = config.connection.endpoint) !== null && _a !== void 0 ? _a : (0, web3_js_1.clusterApiUrl)(config.connection.cluster), (_b = config.connection.commitmentOrConfig) !== null && _b !== void 0 ? _b : "confirmed");
        return new SolanaSdk(connection, config.connection.cluster, { debug: !!config.debug });
    };
    return SolanaSdk;
}());
exports.SolanaSdk = SolanaSdk;
