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
var solana_common_1 = require("@rarible/solana-common");
var common_1 = require("./common");
describe("solana order sdk", function () {
    var sdk = (0, common_1.createSdk)();
    // beforeAll(async () => {
    // 	const wallet1 = getTestWallet(0)
    // 	const wallet2 = getTestWallet(1)
    // 	await requestSol(sdk.connection, wallet1.publicKey, 1)
    // 	console.log("fund 1 wallet, awaiting...")
    // 	await delay(10000)
    // 	await requestSol(sdk.connection, wallet2.publicKey, 1)
    // 	console.log("fund 2 wallet")
    // })
    test("Should sell & buy nft", function () { return __awaiter(void 0, void 0, void 0, function () {
        var sellerWallet, mint, price, tokenAmount, sellTxId, buyerWallet, buyTxId, finalTxId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerWallet = (0, common_1.getTestWallet)();
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: sellerWallet })];
                case 1:
                    mint = (_a.sent()).mint;
                    price = 0.01;
                    tokenAmount = 1;
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(common_1.TEST_AUCTION_HOUSE),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 2: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 3:
                    sellTxId = (_a.sent()).txId;
                    expect(sellTxId).toBeTruthy();
                    buyerWallet = (0, common_1.genTestWallet)();
                    return [4 /*yield*/, (0, common_1.requestSol)(sdk.connection, buyerWallet.publicKey, 0.1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, sdk.order.buy({
                            auctionHouse: (0, solana_common_1.toPublicKey)(common_1.TEST_AUCTION_HOUSE),
                            signer: buyerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 5: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 6:
                    buyTxId = (_a.sent()).txId;
                    expect(buyTxId).toBeTruthy();
                    console.log(JSON.stringify({
                        auctionHouse: common_1.TEST_AUCTION_HOUSE,
                        sellerWallet: sellerWallet.publicKey.toString(),
                        buyerWallet: buyerWallet.publicKey.toString(),
                        mint: mint,
                    }, null, " "));
                    return [4 /*yield*/, sdk.order.executeSell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(common_1.TEST_AUCTION_HOUSE),
                            signer: buyerWallet,
                            buyerWallet: buyerWallet.publicKey,
                            sellerWallet: sellerWallet.publicKey,
                            tokensAmount: tokenAmount,
                            mint: mint,
                            price: price,
                        })];
                case 7: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 8:
                    finalTxId = (_a.sent()).txId;
                    expect(finalTxId).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should buy & execute sell in one call", function () { return __awaiter(void 0, void 0, void 0, function () {
        var sellerWallet, mint, price, tokenAmount, sellTxId, buyerWallet, buyPrepare, executeSellPrepare, finalTx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerWallet = (0, common_1.getTestWallet)();
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: sellerWallet })];
                case 1:
                    mint = (_a.sent()).mint;
                    price = 0.01;
                    tokenAmount = 1;
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(common_1.TEST_AUCTION_HOUSE),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 2: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 3:
                    sellTxId = (_a.sent()).txId;
                    expect(sellTxId).toBeTruthy();
                    buyerWallet = (0, common_1.genTestWallet)();
                    return [4 /*yield*/, (0, common_1.requestSol)(sdk.connection, buyerWallet.publicKey, 0.1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, sdk.order.buy({
                            auctionHouse: (0, solana_common_1.toPublicKey)(common_1.TEST_AUCTION_HOUSE),
                            signer: buyerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 5:
                    buyPrepare = _a.sent();
                    return [4 /*yield*/, sdk.order.executeSell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(common_1.TEST_AUCTION_HOUSE),
                            signer: buyerWallet,
                            buyerWallet: buyerWallet.publicKey,
                            sellerWallet: sellerWallet.publicKey,
                            tokensAmount: tokenAmount,
                            mint: mint,
                            price: price,
                        })];
                case 6:
                    executeSellPrepare = _a.sent();
                    return [4 /*yield*/, sdk.unionInstructionsAndSend(buyerWallet, [buyPrepare, executeSellPrepare], "max")];
                case 7:
                    finalTx = _a.sent();
                    expect(finalTx.txId).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should make bid & sell nft", function () { return __awaiter(void 0, void 0, void 0, function () {
        var sellerWallet, auctionHouse, mint, price, tokenAmount, buyerWallet, buyTxId, sellTxId, finalTxId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerWallet = (0, common_1.getTestWallet)();
                    auctionHouse = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: sellerWallet })];
                case 1:
                    mint = (_a.sent()).mint;
                    price = 0.01;
                    tokenAmount = 1;
                    buyerWallet = (0, common_1.genTestWallet)();
                    return [4 /*yield*/, (0, common_1.requestSol)(sdk.connection, buyerWallet.publicKey, 0.1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sdk.order.buy({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: buyerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 3: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 4:
                    buyTxId = (_a.sent()).txId;
                    expect(buyTxId).toBeTruthy();
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 5: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 6:
                    sellTxId = (_a.sent()).txId;
                    expect(sellTxId).toBeTruthy();
                    console.log(JSON.stringify({
                        auctionHouse: auctionHouse,
                        sellerWallet: sellerWallet.publicKey.toString(),
                        buyerWallet: buyerWallet.publicKey.toString(),
                        mint: mint,
                    }, null, " "));
                    return [4 /*yield*/, sdk.order.executeSell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            buyerWallet: buyerWallet.publicKey,
                            sellerWallet: sellerWallet.publicKey,
                            tokensAmount: tokenAmount,
                            mint: mint,
                            price: price,
                        })];
                case 7: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 8:
                    finalTxId = (_a.sent()).txId;
                    expect(finalTxId).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should sell & cancel", function () { return __awaiter(void 0, void 0, void 0, function () {
        var sellerWallet, auctionHouse, mint, price, tokenAmount, sellTxId, txId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerWallet = (0, common_1.getTestWallet)();
                    auctionHouse = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
                    mint = (0, solana_common_1.toPublicKey)("6APnUDJXkTAbT5tpKr3WeMGQ74p1QcXZjLR6erpnLM8P");
                    price = 0.01;
                    tokenAmount = 1;
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 1: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 2:
                    sellTxId = (_a.sent()).txId;
                    expect(sellTxId).toBeTruthy();
                    return [4 /*yield*/, sdk.order.cancel({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 3: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 4:
                    txId = (_a.sent()).txId;
                    expect(txId).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should buy & cancel", function () { return __awaiter(void 0, void 0, void 0, function () {
        var sellerWallet, auctionHouse, mint, price, tokenAmount, sellTxId, txId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerWallet = (0, common_1.getTestWallet)();
                    auctionHouse = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
                    mint = (0, solana_common_1.toPublicKey)("6APnUDJXkTAbT5tpKr3WeMGQ74p1QcXZjLR6erpnLM8P");
                    price = 0.01;
                    tokenAmount = 1;
                    return [4 /*yield*/, sdk.order.buy({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 1: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 2:
                    sellTxId = (_a.sent()).txId;
                    expect(sellTxId).toBeTruthy();
                    return [4 /*yield*/, sdk.confirmTransaction(sellTxId, "confirmed")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sdk.order.cancel({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 4: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 5:
                    txId = (_a.sent()).txId;
                    expect(txId).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should set big sell price", function () { return __awaiter(void 0, void 0, void 0, function () {
        var sellerWallet, auctionHouse, mint, price, tokenAmount, sellTxId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerWallet = (0, common_1.getTestWallet)();
                    auctionHouse = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: sellerWallet })];
                case 1:
                    mint = (_a.sent()).mint;
                    price = "1000000000";
                    tokenAmount = 1;
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: sellerWallet,
                            price: price,
                            tokensAmount: tokenAmount,
                            mint: mint,
                        })];
                case 2: return [4 /*yield*/, (_a.sent()).submit("max")];
                case 3:
                    sellTxId = (_a.sent()).txId;
                    expect(sellTxId).toBeTruthy();
                    console.log(sellTxId);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should sell & transfer & buy", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet1, wallet2, auctionHouse, mint, transferTxId, buyTxId, transactions, ata, accountInfo, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    wallet1 = (0, common_1.getTestWallet)(0);
                    wallet2 = (0, common_1.getTestWallet)(1);
                    auctionHouse = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: wallet1 })
                        // wallet1 put item to sell
                    ];
                case 1:
                    mint = (_e.sent()).mint;
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet1,
                            price: 0.001,
                            tokensAmount: 1,
                            mint: mint,
                        })];
                case 2: 
                // wallet1 put item to sell
                return [4 /*yield*/, (_e.sent()).submit("max")
                    // wallet1 transfer item to wallet2
                ];
                case 3:
                    // wallet1 put item to sell
                    _e.sent();
                    return [4 /*yield*/, sdk.nft.transfer({
                            signer: wallet1,
                            mint: mint,
                            to: wallet2.publicKey,
                            amount: 1,
                        })];
                case 4: return [4 /*yield*/, (_e.sent()).submit("max")];
                case 5:
                    transferTxId = (_e.sent()).txId;
                    return [4 /*yield*/, sdk.confirmTransaction(transferTxId, "confirmed")
                        // wallet2 put item to sell
                    ];
                case 6:
                    _e.sent();
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet2,
                            price: 0.002,
                            tokensAmount: 1,
                            mint: mint,
                        })];
                case 7: 
                // wallet2 put item to sell
                return [4 /*yield*/, (_e.sent()).submit("max")
                    //wallet1 buying item
                ];
                case 8:
                    // wallet2 put item to sell
                    _e.sent();
                    return [4 /*yield*/, sdk.order.buy({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet1,
                            price: 0.002,
                            tokensAmount: 1,
                            mint: mint,
                        })];
                case 9: return [4 /*yield*/, (_e.sent()).submit("max")];
                case 10:
                    buyTxId = (_e.sent()).txId;
                    return [4 /*yield*/, sdk.confirmTransaction(buyTxId, "confirmed")];
                case 11:
                    _e.sent();
                    transactions = [];
                    return [4 /*yield*/, sdk.account.getTokenAccountForMint({ mint: mint, owner: wallet1.publicKey })];
                case 12:
                    ata = _e.sent();
                    if (!ata) return [3 /*break*/, 15];
                    return [4 /*yield*/, sdk.account.getAccountInfo({ tokenAccount: ata, mint: mint })];
                case 13:
                    accountInfo = _e.sent();
                    if (!(accountInfo.delegate && accountInfo.amount.toString() === "0")) return [3 /*break*/, 15];
                    _b = (_a = transactions).push;
                    return [4 /*yield*/, sdk.account.revokeDelegate({ signer: wallet1, tokenAccount: ata })];
                case 14:
                    _b.apply(_a, [_e.sent()]);
                    _e.label = 15;
                case 15:
                    _d = (_c = transactions).push;
                    return [4 /*yield*/, sdk.order.executeSell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet1,
                            buyerWallet: wallet1.publicKey,
                            sellerWallet: wallet2.publicKey,
                            tokensAmount: 1,
                            mint: mint,
                            price: 0.002,
                        })];
                case 16:
                    _d.apply(_c, [_e.sent()]);
                    return [4 /*yield*/, sdk.unionInstructionsAndSend(wallet1, transactions, "confirmed")];
                case 17:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // test have high chance to fail because of unknown condition
    test.skip("Should mint>sell>transfer>buy", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet1, wallet2, auctionHouse, _a, mint, mintTx, prepare, transferTx, sellTx1, sellTx2, cancelTx2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wallet1 = (0, common_1.getTestWallet)(0);
                    wallet2 = (0, common_1.getTestWallet)(1);
                    auctionHouse = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
                    // mint multiple tokens
                    console.log("mint multiple tokens");
                    return [4 /*yield*/, (0, common_1.mintToken)({ sdk: sdk, wallet: wallet1, tokensAmount: 100 })];
                case 1:
                    _a = _b.sent(), mint = _a.mint, mintTx = _a.mintTx;
                    return [4 /*yield*/, sdk.confirmTransaction(mintTx.txId, "finalized")
                        // send some to wallet2
                    ];
                case 2:
                    _b.sent();
                    // send some to wallet2
                    console.log("transfer tokens to wallet2");
                    return [4 /*yield*/, sdk.nft.transfer({
                            mint: mint,
                            signer: wallet1,
                            amount: 50,
                            to: wallet2.publicKey,
                        })];
                case 3:
                    prepare = _b.sent();
                    return [4 /*yield*/, prepare.submit("processed")];
                case 4:
                    transferTx = _b.sent();
                    return [4 /*yield*/, sdk.confirmTransaction(transferTx.txId, "confirmed")
                        // sell from wallet1
                    ];
                case 5:
                    _b.sent();
                    // sell from wallet1
                    console.log("sell tokens from wallet1");
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet1,
                            price: 0.2,
                            tokensAmount: 30,
                            mint: mint,
                        })];
                case 6: return [4 /*yield*/, (_b.sent()).submit("confirmed")
                    // sell from wallet2
                ];
                case 7:
                    sellTx1 = (_b.sent()).txId;
                    // sell from wallet2
                    console.log("sell tokens from wallet2");
                    return [4 /*yield*/, sdk.order.sell({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet2,
                            price: 0.1,
                            tokensAmount: 40,
                            mint: mint,
                        })];
                case 8: return [4 /*yield*/, (_b.sent()).submit("confirmed")];
                case 9:
                    sellTx2 = (_b.sent()).txId;
                    console.log("awaiting sell txs");
                    // await Promise.all([
                    // 	sdk.confirmTransaction(sellTx1, "confirmed"),
                    // 	sdk.confirmTransaction(sellTx2, "confirmed"),
                    // ])
                    return [4 /*yield*/, sdk.confirmTransaction(sellTx1, "confirmed")];
                case 10:
                    // await Promise.all([
                    // 	sdk.confirmTransaction(sellTx1, "confirmed"),
                    // 	sdk.confirmTransaction(sellTx2, "confirmed"),
                    // ])
                    _b.sent();
                    return [4 /*yield*/, sdk.confirmTransaction(sellTx2, "confirmed")];
                case 11:
                    _b.sent();
                    console.log("cancel sell for wallet2");
                    return [4 /*yield*/, sdk.order.cancel({
                            auctionHouse: (0, solana_common_1.toPublicKey)(auctionHouse),
                            signer: wallet2,
                            price: 0.1,
                            tokensAmount: 40,
                            mint: mint,
                        })];
                case 12: return [4 /*yield*/, (_b.sent()).submit("single")];
                case 13:
                    cancelTx2 = (_b.sent()).txId;
                    return [4 /*yield*/, sdk.confirmTransaction(cancelTx2, "confirmed")];
                case 14:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
