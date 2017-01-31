import { Card, State, playCard, startGame } from './Domain';
import { UnoEvent } from './Events';

import { curry } from 'ramda';
/**
 * Created by krazar on 31/01/2017.
 */
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

export const decide = curry((command: UnoCommand, state: State): UnoEvent[] => {
  switch (command.kind) {
    case('PlayCard'):
      return playCard(command, state);
    case('StartGame'):
      return startGame(command, state);
    default:
      return [];
  }
});
