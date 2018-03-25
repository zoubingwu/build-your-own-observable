export default class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static fromEvent(element, event) {
    return new Observable(observer => {
      const handler = e => observer.next(e);
      element.addEventListener(event, handler);

      return () => {
        element.removeEventListener(event, handler);
      };
    });
  }

  map(mapFn) {
    return new Observable(observer => {
      return this.subscribe({
        next: val => observer.next(mapFn(val)),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }
}
