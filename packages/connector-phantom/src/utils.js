"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntil = void 0;
function waitUntil(checkFn, checkDelay, timeout) {
    var startTime = Date.now();
    function check(resolve, reject) {
        if (checkFn()) {
            resolve();
        }
        else if (Date.now() - startTime > timeout) {
            reject();
        }
        else {
            setTimeout(function () { return check(resolve, reject); }, checkDelay);
        }
    }
    return new Promise(function (resolve, reject) {
        check(resolve, reject);
    });
}
exports.waitUntil = waitUntil;
