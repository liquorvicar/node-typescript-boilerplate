/**
 * Created by krazar on 31/01/2017.
 */
import { decide, Color, Digit, InitinalState, StartGame } from '../src/ddd/uno/domain/Domain';

it('delays the greeting by 2 seconds', () => {

  const command: StartGame = {
    kind: 'StartGame',
    numberOfPlayer: 3,
    firstCard: { digit: Digit.Five, color: Color.Blue },
  };
  expect(decide(command, InitinalState)).toEqual([{kind: 'GameStarted'}]);
});
