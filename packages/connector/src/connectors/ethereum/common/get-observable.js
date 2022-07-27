"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservable = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
function getObservable(provider, getRaw, mapRaw, eventName) {
    var _this = this;
    if ("on" in provider) {
        return new rxjs_1.Observable(function (subscriber) {
            var handler = function (raw) {
                subscriber.next(mapRaw(raw));
            };
            getRaw(provider)
                .then(handler)
                .catch(function (err) { return subscriber.error(err); });
            provider.on(eventName, handler);
            if ("removeListener" in provider) {
                subscriber.add(function () {
                    provider.removeListener(eventName, handler);
                });
            }
        });
    }
    else {
        return (0, rxjs_1.from)((function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var raw;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRaw(provider)];
                    case 1:
                        raw = _a.sent();
                        return [2 /*return*/, mapRaw(raw)];
                }
            });
        }); })());
    }
}
exports.getObservable = getObservable;
