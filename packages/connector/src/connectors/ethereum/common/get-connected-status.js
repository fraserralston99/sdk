"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectedStatus = void 0;
var rxjs_1 = require("rxjs");
function getConnectedStatus(provider) {
    if ("on" in provider) {
        return new rxjs_1.Observable(function (subscriber) {
            subscriber.next("connected");
            function handler() {
                subscriber.next("disconnected");
            }
            provider.on("disconnected", handler);
            if ("removeListener" in provider) {
                subscriber.add(function () {
                    provider.removeListener("disconnected", handler);
                });
            }
        });
    }
    else {
        return (0, rxjs_1.concat)((0, rxjs_1.of)("connected"), rxjs_1.NEVER);
    }
}
exports.getConnectedStatus = getConnectedStatus;
