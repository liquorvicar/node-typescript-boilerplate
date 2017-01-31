"use strict";
const Domain_1 = require("./Domain");
const ramda_1 = require("ramda");
exports.decide = ramda_1.curry((command, state) => {
    switch (command.kind) {
        case ('PlayCard'):
            return Domain_1.playCard(command, state);
        case ('StartGame'):
            return Domain_1.startGame(command, state);
        default:
            return [];
    }
});
