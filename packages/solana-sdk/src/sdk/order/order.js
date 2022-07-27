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
exports.SolanaOrderSdk = void 0;
var prepared_transaction_1 = require("../prepared-transaction");
var sell_1 = require("./methods/sell");
var buy_1 = require("./methods/buy");
var execute_sell_1 = require("./methods/execute-sell");
var cancel_1 = require("./methods/cancel");
var SolanaOrderSdk = /** @class */ (function () {
    function SolanaOrderSdk(connection, logger) {
        this.connection = connection;
        this.logger = logger;
    }
    SolanaOrderSdk.prototype.sell = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var instructions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sell_1.getAuctionHouseSellInstructions)({
                            connection: this.connection,
                            auctionHouse: request.auctionHouse,
                            price: request.price,
                            mint: request.mint,
                            signer: request.signer,
                            tokensAmount: request.tokensAmount,
                        })];
                    case 1:
                        instructions = _a.sent();
                        return [2 /*return*/, new prepared_transaction_1.PreparedTransaction(this.connection, instructions, request.signer, this.logger, function () {
                                _this.logger.log("Set", request.tokensAmount, request.mint.toString(), "for sale for", request.price, "from your account with Auction House", request.auctionHouse.toString());
                            })];
                }
            });
        });
    };
    SolanaOrderSdk.prototype.buy = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var instructions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, buy_1.getActionHouseBuyInstructions)({
                            connection: this.connection,
                            auctionHouse: request.auctionHouse,
                            price: request.price,
                            mint: request.mint,
                            signer: request.signer,
                            tokensAmount: request.tokensAmount,
                            tokenAccount: request.tokenAccount,
                        })];
                    case 1:
                        instructions = _a.sent();
                        return [2 /*return*/, new prepared_transaction_1.PreparedTransaction(this.connection, instructions, request.signer, this.logger, function () {
                                _this.logger.log("Made offer for ", request.mint.toString(), "for", request.price);
                            })];
                }
            });
        });
    };
    SolanaOrderSdk.prototype.cancel = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var instructions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, cancel_1.getAuctionHouseCancelInstructions)({
                            connection: this.connection,
                            auctionHouse: request.auctionHouse,
                            price: request.price,
                            mint: request.mint,
                            signer: request.signer,
                            tokensAmount: request.tokensAmount,
                        })];
                    case 1:
                        instructions = _a.sent();
                        return [2 /*return*/, new prepared_transaction_1.PreparedTransaction(this.connection, instructions, request.signer, this.logger, function () {
                                _this.logger.log("Cancelled order of", request.tokensAmount, request.mint.toString(), "for", request.price);
                            })];
                }
            });
        });
    };
    SolanaOrderSdk.prototype.acceptBid = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sell(request)];
            });
        });
    };
    SolanaOrderSdk.prototype.bid = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.buy(request)];
            });
        });
    };
    SolanaOrderSdk.prototype.executeSell = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var instructions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, execute_sell_1.getAuctionHouseExecuteSellInstructions)({
                            connection: this.connection,
                            auctionHouse: request.auctionHouse,
                            signer: request.signer,
                            buyerWallet: request.buyerWallet,
                            sellerWallet: request.sellerWallet,
                            mint: request.mint,
                            tokenAccount: request.tokenAccount,
                            price: request.price,
                            tokensAmount: request.tokensAmount,
                        })];
                    case 1:
                        instructions = _a.sent();
                        return [2 /*return*/, new prepared_transaction_1.PreparedTransaction(this.connection, instructions, request.signer, this.logger, function () {
                                _this.logger.log("Accepted", request.tokensAmount, request.mint.toString(), "sale from wallet", request.sellerWallet.toString(), "to", request.buyerWallet.toString(), "for", request.price, "from your account with Auction House", request.auctionHouse.toString());
                            })];
                }
            });
        });
    };
    return SolanaOrderSdk;
}());
exports.SolanaOrderSdk = SolanaOrderSdk;
