/**
 * Created by krazar on 31/01/2017.
 */

import { PlayCard, StartGame } from './Command';
import { UnoEvent } from './Events';

export enum Color {
  Red, Green, Blue, Yellow,
}

export enum Digit {
  Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine,
}

export interface Card {
  digit: Digit;
  color: Color;
}

// state
export interface InitialState {
  kind: 'InitialState';
}

export interface Started {
  kind: 'Started';
  numberOfPlayer: number;
  topCard: Card;
  nextPlayer: number;
}

export type State = InitialState | Started;

export const playCard = (command: PlayCard, state: State): UnoEvent[] => {
  switch (state.kind) {
    case 'Started':
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
    default:
      throw Error(`Unexpected State ${state.kind}`);
  }
};

export const startGame = (command: StartGame, state: State): UnoEvent[]  => {
  switch (state.kind) {
    case ('InitialState'):
      return ([{
        kind: 'GameStarted',
        numberOfPlayer: command.numberOfPlayer,
        firstCard: command.firstCard,
      }]);
    default:
      throw Error(`Unexpected State ${state.kind}`);
  }
};
