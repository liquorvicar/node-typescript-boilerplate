import { main } from '../src/ddd/uno/domain/Program';

describe('eventstore', () => {
  it('should return events', (done) => {
    main(() => {
      done();
    });
  });
});
