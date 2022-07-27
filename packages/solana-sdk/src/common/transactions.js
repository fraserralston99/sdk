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
exports.sendSignedTransaction = exports.sendTransactionWithRetry = exports.DEFAULT_TIMEOUT = void 0;
var web3_js_1 = require("@solana/web3.js");
var solana_common_1 = require("@rarible/solana-common");
exports.DEFAULT_TIMEOUT = 60000;
function sendTransactionWithRetry(connection, wallet, instructions, signers, commitment, logger) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, _a, _i, signers_1, signer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    transaction = new web3_js_1.Transaction({ feePayer: wallet.publicKey });
                    instructions.forEach(function (instruction) { return transaction.add(instruction); });
                    _a = transaction;
                    return [4 /*yield*/, connection.getLatestBlockhash(commitment)];
                case 1:
                    _a.recentBlockhash = (_b.sent()).blockhash;
                    if (!(signers.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, wallet.signTransaction(transaction)];
                case 2:
                    _b.sent();
                    _i = 0, signers_1 = signers;
                    _b.label = 3;
                case 3:
                    if (!(_i < signers_1.length)) return [3 /*break*/, 6];
                    signer = signers_1[_i];
                    return [4 /*yield*/, signer.signTransaction(transaction)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, wallet.signTransaction(transaction)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [4 /*yield*/, sendSignedTransaction({
                        connection: connection,
                        signedTransaction: transaction,
                    }, logger)];
                case 10: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.sendTransactionWithRetry = sendTransactionWithRetry;
function sendSignedTransaction(_a, logger) {
    var signedTransaction = _a.signedTransaction, connection = _a.connection, _b = _a.timeout, timeout = _b === void 0 ? exports.DEFAULT_TIMEOUT : _b;
    return __awaiter(this, void 0, void 0, function () {
        var rawTransaction, startTime, slot, txId, done, confirmation, err_1, simulateResult, e_1, i, line;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rawTransaction = signedTransaction.serialize();
                    startTime = (0, solana_common_1.getUnixTs)();
                    slot = 0;
                    return [4 /*yield*/, connection.sendRawTransaction(rawTransaction, {
                            skipPreflight: true,
                        })];
                case 1:
                    txId = _c.sent();
                    logger === null || logger === void 0 ? void 0 : logger.log("Started awaiting confirmation for", txId);
                    done = false;
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(!done && (0, solana_common_1.getUnixTs)() - startTime < timeout)) return [3 /*break*/, 2];
                                    connection.sendRawTransaction(rawTransaction, {
                                        skipPreflight: true,
                                    });
                                    return [4 /*yield*/, (0, solana_common_1.sleep)(500)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, 9, 10]);
                    return [4 /*yield*/, awaitTransactionSignatureConfirmation(txId, timeout, connection, "processed", true, logger)];
                case 3:
                    confirmation = _c.sent();
                    if (!confirmation) {
                        throw new Error("Timed out awaiting confirmation on transaction");
                    }
                    if (confirmation.err) {
                        logger === null || logger === void 0 ? void 0 : logger.error(confirmation.err);
                        throw new Error("Transaction failed: Custom instruction error");
                    }
                    slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
                    return [3 /*break*/, 10];
                case 4:
                    err_1 = _c.sent();
                    logger === null || logger === void 0 ? void 0 : logger.error("Timeout Error caught", err_1);
                    if (err_1.timeout) {
                        throw new Error("Timed out awaiting confirmation on transaction");
                    }
                    simulateResult = null;
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, simulateTransaction(connection, signedTransaction, "single", logger)];
                case 6:
                    simulateResult = (_c.sent()).value;
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _c.sent();
                    logger === null || logger === void 0 ? void 0 : logger.error("Simulate Transaction error", e_1);
                    return [3 /*break*/, 8];
                case 8:
                    if (simulateResult && simulateResult.err) {
                        if (simulateResult.logs) {
                            for (i = simulateResult.logs.length - 1; i >= 0; --i) {
                                line = simulateResult.logs[i];
                                if (line.startsWith("Program log: ")) {
                                    logger === null || logger === void 0 ? void 0 : logger.log(simulateResult.logs);
                                    throw new Error("Transaction failed: " + line.slice("Program log: ".length));
                                }
                            }
                        }
                        throw new Error(JSON.stringify(simulateResult.err));
                    }
                    logger === null || logger === void 0 ? void 0 : logger.error("Got this far.");
                    return [3 /*break*/, 10];
                case 9:
                    done = true;
                    return [7 /*endfinally*/];
                case 10:
                    logger === null || logger === void 0 ? void 0 : logger.log("Latency (ms)", txId, (0, solana_common_1.getUnixTs)() - startTime);
                    return [2 /*return*/, { txId: txId, slot: slot }];
            }
        });
    });
}
exports.sendSignedTransaction = sendSignedTransaction;
function simulateTransaction(connection, transaction, commitment, logger) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, signData, wireTransaction, encodedTransaction, config, args, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // @ts-ignore
                    _a = transaction;
                    return [4 /*yield*/, connection._recentBlockhash(
                        // @ts-ignore
                        connection._disableBlockhashCaching)];
                case 1:
                    // @ts-ignore
                    _a.recentBlockhash = _b.sent();
                    signData = transaction.serializeMessage();
                    wireTransaction = transaction._serialize(signData);
                    encodedTransaction = wireTransaction.toString("base64");
                    config = { encoding: "base64", commitment: commitment };
                    args = [encodedTransaction, config];
                    return [4 /*yield*/, connection._rpcRequest("simulateTransaction", args, logger)];
                case 2:
                    res = _b.sent();
                    if (res.error) {
                        throw new Error("failed to simulate transaction: " + res.error.message);
                    }
                    return [2 /*return*/, res.result];
            }
        });
    });
}
function awaitTransactionSignatureConfirmation(txid, timeout, connection, commitment, queryStatus, logger) {
    if (commitment === void 0) { commitment = "recent"; }
    if (queryStatus === void 0) { queryStatus = false; }
    return __awaiter(this, void 0, void 0, function () {
        var done, status, subId;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    done = false;
                    status = {
                        slot: 0,
                        confirmations: 0,
                        err: null,
                    };
                    subId = 0;
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        setTimeout(function () {
                                            if (done) {
                                                return;
                                            }
                                            done = true;
                                            logger === null || logger === void 0 ? void 0 : logger.log("Rejecting for timeout...");
                                            reject({ timeout: true });
                                        }, timeout);
                                        try {
                                            subId = connection.onSignature(txid, function (result, context) {
                                                done = true;
                                                status = {
                                                    err: result.err,
                                                    slot: context.slot,
                                                    confirmations: 0,
                                                };
                                                if (result.err) {
                                                    logger === null || logger === void 0 ? void 0 : logger.log("Rejected via websocket", result.err);
                                                    reject(status);
                                                }
                                                else {
                                                    logger === null || logger === void 0 ? void 0 : logger.log("Resolved via websocket", result);
                                                    resolve(status);
                                                }
                                            }, commitment);
                                        }
                                        catch (e) {
                                            done = true;
                                            logger === null || logger === void 0 ? void 0 : logger.error("WS error in setup", txid, e);
                                        }
                                        _a.label = 1;
                                    case 1:
                                        if (!(!done && queryStatus)) return [3 /*break*/, 3];
                                        // eslint-disable-next-line no-loop-func
                                        (function () { return __awaiter(_this, void 0, void 0, function () {
                                            var signatureStatuses, e_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 2, , 3]);
                                                        return [4 /*yield*/, connection.getSignatureStatuses([
                                                                txid,
                                                            ])];
                                                    case 1:
                                                        signatureStatuses = _a.sent();
                                                        status = signatureStatuses && signatureStatuses.value[0];
                                                        if (!done) {
                                                            if (!status) {
                                                                logger === null || logger === void 0 ? void 0 : logger.log("REST null result for", txid, status);
                                                            }
                                                            else if (status.err) {
                                                                logger === null || logger === void 0 ? void 0 : logger.error("REST error for", txid, status);
                                                                done = true;
                                                                reject(status.err);
                                                            }
                                                            else if (!status.confirmations) {
                                                                logger === null || logger === void 0 ? void 0 : logger.log("REST no confirmations for", txid, status);
                                                            }
                                                            else {
                                                                logger === null || logger === void 0 ? void 0 : logger.log("REST confirmation for", txid, status);
                                                                done = true;
                                                                resolve(status);
                                                            }
                                                        }
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        e_2 = _a.sent();
                                                        if (!done) {
                                                            logger === null || logger === void 0 ? void 0 : logger.error("REST connection error: txid", txid, e_2);
                                                        }
                                                        return [3 /*break*/, 3];
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); })();
                                        return [4 /*yield*/, (0, solana_common_1.sleep)(2000)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 1];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })
                        //@ts-ignore
                    ];
                case 1:
                    // eslint-disable-next-line no-async-promise-executor
                    status = _a.sent();
                    //@ts-ignore
                    if (connection._signatureSubscriptions[subId]) {
                        connection.removeSignatureListener(subId);
                    }
                    done = true;
                    logger === null || logger === void 0 ? void 0 : logger.log("Returning status", status);
                    return [2 /*return*/, status];
            }
        });
    });
}
