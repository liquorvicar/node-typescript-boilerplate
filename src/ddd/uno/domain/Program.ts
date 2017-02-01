/**
 * Created by krazar on 01/02/2017.
 */

import { read, append } from '../infrastructure/EventStoreHttp';
import { handler } from './CommandHandler';
import { Digit, Color } from './Domain';

const handleCommandToEventStore = handler(read, append);
type GameId = number;
const StreamName = (id: GameId) => `uno-game-${id}`;

const streamName = StreamName(3);

const noop = () => {
  // Nothing here
};

export const main = (cb) => {
  handleCommandToEventStore(
    streamName,
    {
      kind: 'StartGame',
      numberOfPlayer: 3,
      firstCard: {
        digit: Digit.Zero,
        color: Color.Green,
      },
    });

  handleCommandToEventStore(
    streamName,
    {
      kind: 'PlayCard',
      card: {
        digit: Digit.Four,
        color: Color.Green},
      player: 1,
    },
    ).subscribe(noop, (error) => {
    console.error(error);
    cb();
  }, () => {
    cb();
  });
};
