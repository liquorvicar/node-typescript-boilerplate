/**
 * Created by krazar on 01/02/2017.
 */
import * as eventstore from 'geteventstore-promise';
import { Observable, BehaviorSubject } from 'rxjs';
import { EventVersion } from '../domain/CommandHandler';
import { UnoEvent } from '../domain/Events';
import { omit } from 'ramda';

const client = eventstore.http({
  hostname: 'localhost',
  port: 2113,
  credentials: {
    username: 'admin',
    password: 'changeit',
  },
});

const cleanEventData = omit(['kind']);
const isMore = (response) => response
&& response.length
&& !!response[response.length - 1].links.find(elm => elm.relation === 'next');
const lastVersion = (response) => response[response.length - 1].eventNumber;

export const read = (streamName: string, version: number = 0): Observable<EventVersion> => {
  const request = new BehaviorSubject<number>(version);

  return request.mergeMap(v =>
    Observable.fromPromise(
      client.getEvents(streamName, v, 1000, 'forward').catch(() => []),
    ),
  )
    .do(response => {
      if (isMore(response)) {
        request.next(lastVersion(response));
      } else {
        request.complete();
      }
    })
    .flatMap((events: any[]) => Observable.from(events))
    .map(event => ({
        event: Object.assign(event.data, { kind: event.eventType }),
        version: event.eventNumber,
      }),
    );
};

export const append = (streamName: string, expectedVersion, events: UnoEvent[]) => {
  const eventsWithId = events
    .map(event => eventstore.eventFactory.NewEvent(event.kind, cleanEventData(event)));
  return Observable.fromPromise(client.writeEvents(streamName, eventsWithId, { expectedVersion }))
    .do(response => {
      console.log(JSON.stringify(response));
    });
};
