"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxFeesBasePointSupport = exports.PayoutsSupport = exports.OriginFeeSupport = void 0;
var OriginFeeSupport;
(function (OriginFeeSupport) {
    OriginFeeSupport["NONE"] = "NONE";
    OriginFeeSupport["AMOUNT_ONLY"] = "AMOUNT_ONLY";
    OriginFeeSupport["FULL"] = "FULL";
})(OriginFeeSupport = exports.OriginFeeSupport || (exports.OriginFeeSupport = {}));
var PayoutsSupport;
(function (PayoutsSupport) {
    PayoutsSupport["NONE"] = "NONE";
    PayoutsSupport["SINGLE"] = "SINGLE";
    PayoutsSupport["MULTIPLE"] = "MULTIPLE";
})(PayoutsSupport = exports.PayoutsSupport || (exports.PayoutsSupport = {}));
var MaxFeesBasePointSupport;
(function (MaxFeesBasePointSupport) {
    MaxFeesBasePointSupport["IGNORED"] = "IGNORED";
    MaxFeesBasePointSupport["REQUIRED"] = "REQUIRED";
})(MaxFeesBasePointSupport = exports.MaxFeesBasePointSupport || (exports.MaxFeesBasePointSupport = {}));
