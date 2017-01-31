/**
 * Created by krazar on 31/01/2017.
 */

import { curry } from 'ramda';
import { List } from 'immutable';

enum Color {
  Red, Green, Blue, Yellow,
}

enum Digit {
  Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine
}

interface Card {
  digit: Digit;
  color: Color;
}

/** todo move to event*/
interface SomethingHappened {
  kind: 'SomethingHappened';
}

/** todo move to command*/
class DoSomething {}
class DoThat {}

/** state */
class InitinalState {}


type UnoEvent =
     SomethingHappened;

type UnoCommand = DoSomething | DoThat;

type State = InitinalState;


let decide = curry((command: UnoCommand, state: State): UnoEvent[] => []);

let evolve = curry((state: State, event: UnoEvent) => state);
