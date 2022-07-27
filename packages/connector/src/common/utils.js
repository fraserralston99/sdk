"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.promiseToObservable = exports.cache = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function cache(fn) {
    var promise = undefined;
    return new rxjs_1.Observable(function (subscriber) {
        if (promise === undefined) {
            promise = fn();
        }
        promise
            .then(function (value) { return subscriber.next(value); })
            .catch(function (error) {
            promise = undefined;
            subscriber.error(error);
        });
    });
}
exports.cache = cache;
function promiseToObservable(promise) {
    return (0, rxjs_1.from)(promise).pipe((0, operators_1.mergeMap)(function (it) { return it; }));
}
exports.promiseToObservable = promiseToObservable;
function noop() { }
exports.noop = noop;
