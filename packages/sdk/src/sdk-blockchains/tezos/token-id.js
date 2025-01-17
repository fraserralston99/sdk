"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosTokenId = void 0;
var tslib_1 = require("tslib");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var types_1 = require("@rarible/types");
var common_1 = require("./common");
var TezosTokenId = /** @class */ (function () {
    function TezosTokenId(provider) {
        this.provider = provider;
        this.generateTokenId = this.generateTokenId.bind(this);
    }
    TezosTokenId.prototype.generateTokenId = function (_a) {
        var collection = _a.collection;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tokenId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, tezos_sdk_1.get_next_token_id)((0, common_1.getRequiredProvider)(this.provider), (0, common_1.convertFromContractAddress)(collection))];
                    case 1:
                        tokenId = _b.sent();
                        return [2 /*return*/, {
                                tokenId: tokenId.toString(),
                                signature: {
                                    v: 0,
                                    r: (0, types_1.toBinary)("0"),
                                    s: (0, types_1.toBinary)("0"),
                                },
                            }];
                }
            });
        });
    };
    return TezosTokenId;
}());
exports.TezosTokenId = TezosTokenId;
