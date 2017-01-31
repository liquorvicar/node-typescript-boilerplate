"use strict";
const ramda_1 = require("ramda");
exports.evolve = ramda_1.curry((state, event) => {
    switch (event.kind) {
        case 'GameStarted':
            return {
                kind: 'Started',
                numberOfPlayer: event.numberOfPlayer,
                topCard: event.firstCard,
                nextPlayer: 1,
            };
        case 'CardPlayed':
            return Object.assign(state, { topCard: event.card, nextPlayer: event.player + 1 });
        case 'InvalidCardPlayed': // don't need this  bc no state change
        default:
            return state;
    }
});
