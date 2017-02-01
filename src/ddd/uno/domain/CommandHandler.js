/**
 * Created by krazar on 31/01/2017.
 */
"use strict";
const ramda_1 = require("ramda");
const Events_1 = require("./Events");
const Command_1 = require("./Command");
exports.handler = ramda_1.curry((read, append, stream, command) => {
    const startVersion = 0;
    const initialState = {
        kind: 'InitialState',
    };
    const resultFromRead$ = read('someStream', 0);
    const stateVersion$ = resultFromRead$
        .reduce((acc, eventVersion) => ({
        state: Events_1.evolve(acc.state, eventVersion.event),
        version: eventVersion.version,
    }), { state: initialState, version: startVersion });
    return stateVersion$
        .mergeMap(finalStateVersion => append(stream, finalStateVersion.version, Command_1.decide(command, finalStateVersion.state)));
});
