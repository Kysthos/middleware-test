/**
 * Function that needs to be called in order to
 * pass the control to the next middleware
 */
type Done = () => void;

export class MiddlewareManager<T extends Array<any>> {
  private chain: ((...args: [...T, Done]) => void)[] = [];

  use(middleware: (...args: [...T, Done]) => void) {
    this.chain.push(middleware);
  }

  dispatch(...args: T) {
    if (this.chain.length === 0) return;
    let index = 0;
    const done = () => {
      index++;
      if (this.chain[index]) this.chain[index](...args, done);
    };
    this.chain[index](...args, done);
  }
}
