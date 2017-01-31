"use strict";
/**
 * Created by krazar on 31/01/2017.
 */
const ramda_1 = require("ramda");
const add = ramda_1.curry((x, y) => x + y);
class CommandHandler {
    test() {
        const inc = add(1);
        const doubleInc = ramda_1.compose(inc, inc);
        const five = doubleInc(3);
        const four = inc(3);
    }
}
