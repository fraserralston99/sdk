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
var common_1 = require("./common");
describe("solana nft sdk", function () {
    var sdk = (0, common_1.createSdk)();
    test("Should mint nft & send", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, mint, _a, wallet2, transferPrepare, transferTx, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    wallet = (0, common_1.getTestWallet)();
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: wallet })];
                case 1:
                    mint = (_d.sent()).mint;
                    _a = expect;
                    return [4 /*yield*/, sdk.balances.getTokenBalance(wallet.publicKey, mint)];
                case 2:
                    _a.apply(void 0, [(_d.sent()).toString()]).toEqual("1");
                    wallet2 = (0, common_1.genTestWallet)();
                    return [4 /*yield*/, sdk.nft.transfer({
                            signer: wallet,
                            mint: mint,
                            to: wallet2.publicKey,
                            amount: 1,
                        })];
                case 3:
                    transferPrepare = _d.sent();
                    return [4 /*yield*/, transferPrepare.submit("max")];
                case 4:
                    transferTx = _d.sent();
                    expect(transferTx).toBeTruthy();
                    return [4 /*yield*/, sdk.confirmTransaction(transferTx.txId, "finalized")];
                case 5:
                    _d.sent();
                    _b = expect;
                    return [4 /*yield*/, sdk.balances.getTokenBalance(wallet2.publicKey, mint)];
                case 6:
                    _b.apply(void 0, [(_d.sent()).toString()]).toEqual("1");
                    _c = expect;
                    return [4 /*yield*/, sdk.balances.getTokenBalance(wallet.publicKey, mint)];
                case 7:
                    _c.apply(void 0, [(_d.sent()).toString()]).toEqual("0");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should mint nft & burn", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, mint, burnPrepare, burnTx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wallet = (0, common_1.getTestWallet)();
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: wallet })];
                case 1:
                    mint = (_b.sent()).mint;
                    return [4 /*yield*/, sdk.nft.burn({
                            signer: wallet,
                            mint: mint,
                            amount: 1,
                        })];
                case 2:
                    burnPrepare = _b.sent();
                    return [4 /*yield*/, burnPrepare.submit("finalized")];
                case 3:
                    burnTx = _b.sent();
                    expect(burnTx).toBeTruthy();
                    return [4 /*yield*/, sdk.confirmTransaction(burnTx.txId, "finalized")];
                case 4:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, sdk.balances.getTokenBalance(wallet.publicKey, mint)];
                case 5:
                    _a.apply(void 0, [(_b.sent()).toString()]).toEqual("0");
                    return [2 /*return*/];
            }
        });
    }); });
});
