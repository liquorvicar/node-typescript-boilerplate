/**
 * Created by krazar on 31/01/2017.
 */

import { curry } from 'ramda';

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
  numberOfPlayer: number;
  firstCard: Card;
}

export interface CardPlayed {
  kind: 'CardPlayed';
  card: Card;
  player: number;
}

export interface InvalidCardPlayed {
  kind: 'InvalidCardPlayed',
  card: Card;
  player: number;
}

export interface NotPlayerTurn {
  kind: 'NotPlayerTurn'; // we keep the card because this is strategic information
  card: Card;
  player: number;
}

export type UnoEvent =
  GameStarted | CardPlayed | InvalidCardPlayed | NotPlayerTurn;

// todo move to command
export interface StartGame {
  kind: 'StartGame';
  numberOfPlayer: number;
  firstCard: Card;
}

export interface PlayCard {
  kind: 'PlayCard';
  card: Card;
  player: number;
}

export type UnoCommand =
  StartGame | PlayCard;

// state
interface InitialState {
  kind: 'InitialState';
}

export interface Started {
  kind: 'Started';
  numberOfPlayer: number;
  topCard: Card;
  nextPlayer: number;
}

export type State = InitialState | Started;

export const decide = curry((command: UnoCommand, state: State): UnoEvent[] => {
  if (command.kind === 'StartGame' && state.kind === 'InitialState') {
    return ([{
      kind: 'GameStarted',
      numberOfPlayer: command.numberOfPlayer,
      firstCard: command.firstCard,
    }]);
  }
  if (command.kind === 'PlayCard' && state.kind === 'Started') {
    if (command.player !== state.nextPlayer) {
      return [{
        kind: 'NotPlayerTurn',
        card: command.card,
        player: command.player,
      }];
    }
    if (
      (command.card.color === state.topCard.color) ||
      (command.card.digit === state.topCard.digit)
    ) {
      return [{
        kind: 'CardPlayed',
        card: command.card,
        player: command.player,
      }];
    } else {
      return [{
        kind: 'InvalidCardPlayed',
        card: command.card,
        player: command.player,
      }];
    }
  }
  if (command.kind === 'StartGame' && state.kind === 'Started') {
    throw Error('Unexpected State');
  }
  return [];
});

export const evolve = curry((state: State, event: UnoEvent) => {
  switch (event.kind) {
    case 'GameStarted':
      return {
        kind: 'Started',
        numberOfPlayer: event.numberOfPlayer,
        topCard: event.firstCard,
        nextPlayer: 1, // we don't have guard on State Type
      };
    case 'CardPlayed':
      return Object.assign(state, { topCard: event.card, nextPlayer: event.player + 1 });
    case 'InvalidCardPlayed': // don't need this  bc no state change
    default:
      return state;
  }
});
