/**
 * Created by krazar on 31/01/2017.
 */

import { curry } from 'ramda';
import { Observable } from 'rxjs';
import { UnoEvent, evolve } from './Events';
import { State, InitialState } from './Domain';
import { UnoCommand, decide } from './Command';

export interface EventVersion {
  event: UnoEvent;
  version: number;
}

export interface EventsVersion {
  events: UnoEvent[];
  version: number;
}

export interface StateVersion {
  state: State;
  version: number;
}

interface Read {
  (eventStream: string, version: number): Observable<EventVersion>;
}

interface Append {
  (eventStream: string, version: number, events: UnoEvent[]): Observable<any>;
}

export const handler = curry((read: Read, append: Append, streamName: string, command: UnoCommand): Promise<any> => {
  const startVersion = 0;
  const initialState: InitialState = {
    kind: 'InitialState',
  };
  const resultFromRead$ = read(streamName, 0);
  const stateVersion$: Observable<StateVersion> = resultFromRead$
    .reduce((acc: StateVersion, eventVersion: EventVersion) => ({
      state: evolve(acc.state, eventVersion.event),
      version: eventVersion.version,
    }), { state: initialState, version: startVersion });

  return stateVersion$
    .mergeMap(finalStateVersion => append(
      streamName,
      finalStateVersion.version,
      decide(command, finalStateVersion.state),
    )).toPromise();
});
