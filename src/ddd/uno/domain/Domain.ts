/**
 * Created by krazar on 31/01/2017.
 */

import { curry } from 'ramda';
import { List } from 'immutable';

export enum Color {
  Red, Green, Blue, Yellow,
}

export enum Digit {
  Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine
}

interface Card {
  digit: Digit;
  color: Color;
}

// todo move to event
export interface GameStarted {
  kind: 'GameStarted';
}

// todo move to command
export interface StartGame {
  kind: 'StartGame';
  numberOfPlayer: number;
  firstCard: Card;
}

// state
export class InitinalState {
}


export type UnoEvent =
  GameStarted;

export type UnoCommand = StartGame;

export type State = InitinalState;


export const decide = curry((command: UnoCommand, state: State): UnoEvent[] => {
  switch (command.kind) {
    case ('StartGame'):
      return ([{
        kind: 'GameStarted',
      }]);
    default:
      return [];
  }
});

export const evolve = curry((state: State, event: UnoEvent) => state);


