/**
 * Created by krazar on 31/01/2017.
 */
import { decide, Color, Digit, evolve, UnoEvent, UnoCommand } from '../src/ddd/uno/domain/Domain';

const initState = {
  kind: 'InitialState',
};

const given = (events: UnoEvent[], command: UnoCommand) => {
  const state = events.reduce(evolve, initState);
  return decide(command, state);
};

const expectResult = (result: UnoEvent[]) => (expected) => {
  it('should equal expected', () => {
    expect(result).toEqual(expected);
  });
};

const expectFailure = (result: UnoEvent[], expected) => {
  it('should be expected error', () => {
    expect(result).toThrowError(expected);
  });
};

const expectEvent = (events: UnoEvent[], command: UnoCommand, expected) => expectResult(given(events, command))(expected);
const expectError = (events: UnoEvent[], command: UnoCommand, expected) => () => (expectFailure(given(events, command), expected));

describe('as Initial State. when  StartGame Command is reieved', () => {

  expectEvent([], {
      kind: 'StartGame',
      numberOfPlayer: 3,
      firstCard: { digit: Digit.Five, color: Color.Blue },
    },
    [{
      kind: 'GameStarted',
      numberOfPlayer: 3,
      firstCard: { digit: Digit.Five, color: Color.Blue },
    }]);
});

describe('as game started state, when recieving StartGame Command', () => {

  expectError(
    [{
      kind: 'GameStarted',
      numberOfPlayer: 3,
      firstCard: { digit: Digit.Five, color: Color.Blue },
    }],
    {
      kind: 'StartGame',
      numberOfPlayer: 4,
      firstCard: { digit: Digit.Three, color: Color.Blue },
    },
    Error(),
  );

});

describe('Playing same color should be ok', () => {

  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      }],
    {
      kind: 'PlayCard',
      card: { digit: Digit.Four, color: Color.Blue },
      player: 1,
    },
    [
      {
        kind: 'CardPlayed',
        card: { digit: Digit.Four, color: Color.Blue },
        player: 1,
      },
    ],
  );

});

describe('Playing some value should be ok', () => {
  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      },
    ],
    {
      kind: 'PlayCard',
      card: { digit: Digit.Five, color: Color.Red },
      player: 1,
    },
    [
      {
        kind: 'CardPlayed',
        card: { digit: Digit.Five, color: Color.Red },
        player: 1,
      },
    ],
  );
});

describe('Player different color and different value should e rejected', () => {
  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      },
    ],
    {
      kind: 'PlayCard',
      card: { digit: Digit.One, color: Color.Red },
      player: 1,
    },
    [
      {
        kind: 'InvalidCardPlayed',
        card: { digit: Digit.One, color: Color.Red },
        player: 1,
      },
    ],
  );
});

describe(' Player can play at his turn', () => {
  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      },
    ],
    {
      kind: 'PlayCard',
      card: { digit: Digit.Five, color: Color.Red },
      player: 1,
    },
    [
      {
        kind: 'CardPlayed',
        card: { digit: Digit.Five, color: Color.Red },
        player: 1,
      },
    ],
  );

  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      },
      {
        kind: 'CardPlayed',
        card: { digit: Digit.Five, color: Color.Red },
        player: 1,
      },
    ],
    {
      kind: 'PlayCard',
      card: { digit: Digit.Six, color: Color.Red },
      player: 2,
    },
    [
      {
        kind: 'CardPlayed',
        card: { digit: Digit.Six, color: Color.Red },
        player: 2,
      },
    ],
  );
});

describe('Player cannot play outside of his turn', () => {
  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      },
    ],
    {
      kind: 'PlayCard',
      card: { digit: Digit.Five, color: Color.Red },
      player: 2,
    },
    [
      {
        kind: 'NotPlayerTurn',
        card: { digit: Digit.Five, color: Color.Red },
        player: 2,
      },
    ],
  );

  expectEvent([
      {
        kind: 'GameStarted',
        numberOfPlayer: 3,
        firstCard: { digit: Digit.Five, color: Color.Blue },
      },
      {
        kind: 'CardPlayed',
        card: { digit: Digit.Five, color: Color.Red },
        player: 1,
      },
    ],
    {
      kind: 'PlayCard',
      card: { digit: Digit.Six, color: Color.Red },
      player: 1,
    },
    [
      {
        kind: 'NotPlayerTurn',
        card: { digit: Digit.Six, color: Color.Red },
        player: 1,
      },
    ],
  );
});
