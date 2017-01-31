// Below is an example of using TSLint errors suppression
"use strict";
const tslib_1 = require("tslib");
/**
 * Returns a Promise<string> that resolves after given time.
 *
 * @param {string} name - Somebody's name
 * @param {number=} [delay=2000] - Number of milliseconds to delay resolution.
 * @returns {Promise<string>}
 */
function delayedHello(name, delay = 2000) {
    // tslint:disable-next-line no-string-based-set-timeout
    return new Promise((resolve) => setTimeout(resolve(`Hello, ${name}`), delay));
}
function greeter(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield delayedHello(name);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = greeter;
console.log("hello world");
