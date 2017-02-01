/**
 * Created by krazar on 01/02/2017.
 */

import { read, append } from '../infrastructure/EventStoreHttp';
import { handler } from './CommandHandler';
import { Digit, Color } from './Domain';

const handleCommandToEventStore = handler(read, append);
type GameId = number;
const StreamName = (id: GameId) => `uno-game-${id}`;

export const startGame = (gameId) => {
  return handleCommandToEventStore(
    StreamName(gameId),
    {
      kind: 'StartGame',
      numberOfPlayer: 3,
      firstCard: {
        digit: Digit.Zero,
        color: Color.Green,
      },
    });
};

export const playCard = (gameId) => {
  return handleCommandToEventStore(
    StreamName(gameId),
    {
      kind: 'PlayCard',
      card: {
        digit: Digit.Four,
        color: Color.Green
      },
      player: 1,
    });
};
