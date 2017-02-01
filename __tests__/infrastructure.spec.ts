import { playCard, startGame } from '../src/ddd/uno/domain/Program';
import * as uuidV4 from 'uuid/v4';

describe('eventstore', () => {
  it('should return events', async () => {
    const gameId = uuidV4();
     const result = await startGame(gameId);
     console.log(JSON.stringify(result));
     await playCard(gameId);
  });
});
