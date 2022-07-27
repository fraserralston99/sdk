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
exports.SolanaBalancesSdk = void 0;
var bignumber_js_1 = require("bignumber.js");
var web3_js_1 = require("@solana/web3.js");
var SolanaBalancesSdk = /** @class */ (function () {
    function SolanaBalancesSdk(connection, logger) {
        this.connection = connection;
        this.logger = logger;
    }
    SolanaBalancesSdk.prototype.getBalance = function (publicKey, options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = bignumber_js_1.default.bind;
                        return [4 /*yield*/, this.connection.getBalance(publicKey, (_a = options.commitment) !== null && _a !== void 0 ? _a : "confirmed")];
                    case 1: return [2 /*return*/, new (_b.apply(bignumber_js_1.default, [void 0, _c.sent()]))().dividedBy(web3_js_1.LAMPORTS_PER_SOL)];
                }
            });
        });
    };
    SolanaBalancesSdk.prototype.getTokenBalance = function (owner, mint, options) {
        var _a, _b, _c;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var accounts, res, _i, _d, tokenAccount, balance;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.connection.getTokenAccountsByOwner(owner, { mint: mint })];
                    case 1:
                        accounts = _e.sent();
                        res = new bignumber_js_1.default(0);
                        _i = 0, _d = accounts.value;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _d.length)) return [3 /*break*/, 5];
                        tokenAccount = _d[_i];
                        return [4 /*yield*/, this.connection.getTokenAccountBalance(tokenAccount.pubkey, (_a = options.commitment) !== null && _a !== void 0 ? _a : "confirmed")];
                    case 3:
                        balance = _e.sent();
                        res = res.plus(new bignumber_js_1.default((_c = (_b = balance === null || balance === void 0 ? void 0 : balance.value) === null || _b === void 0 ? void 0 : _b.uiAmountString) !== null && _c !== void 0 ? _c : 0));
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.logger.log("Wallet ".concat(owner, " have ").concat(res, " of ").concat(mint.toString(), " tokens"));
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return SolanaBalancesSdk;
}());
exports.SolanaBalancesSdk = SolanaBalancesSdk;
