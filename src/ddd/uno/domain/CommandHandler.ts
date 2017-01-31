/**
 * Created by krazar on 31/01/2017.
 */
import { curry, compose } from 'ramda'


const add = curry((x: number, y: number) => x + y);

class CommandHandler {
  test() {
    const inc = add(1);
    const doubleInc = compose(inc, inc);
    const five = doubleInc(3)
    const four = inc(3)

  }
}
