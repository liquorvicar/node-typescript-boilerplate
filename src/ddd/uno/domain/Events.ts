import { Card, State } from './Domain';
import { curry } from 'ramda';
/**
 * Created by krazar on 31/01/2017.
 */

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
  kind: 'InvalidCardPlayed';
  card: Card;
  player: number;
}

export interface PlayedAtWrongTurn {
  kind: 'PlayedAtWrongTurn'; // we keep the card because this is strategic information
  card: Card;
  player: number;
}

export type UnoEvent =
  GameStarted | CardPlayed | InvalidCardPlayed | PlayedAtWrongTurn;

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
