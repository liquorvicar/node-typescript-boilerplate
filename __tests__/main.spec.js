"use strict";
const tslib_1 = require("tslib");
const main_1 = require("../src/main");
jest.useFakeTimers();
let hello;
beforeAll(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
    hello = yield main_1.default('John');
}));
it('delays the greeting by 2 seconds', () => {
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(2000);
});
it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe('Hello, John');
});
