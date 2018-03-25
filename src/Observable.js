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

  static fromArray(array) {
    return new Observable(observer => {
      array.forEach(val => observer.next(val));
      observer.complete();
    });
  }

  static fromPromise(promise) {
    return new Observable(observer => {
      promise.then(val => {
        observer.next(val);
        observer.complete();
      })
      .catch(e => {
        observer.error(val);
        observer.complete();
      });
    })
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

  mergeMap(anotherFunctionThatThrowsValues) {
    return new Observable(observer => {
      return this.subscribe({
        next(val) {
          anotherFunctionThatThrowsValues(val).subscribe({
            next(val) {
              observer.next(val);
            },
            error(e) {
              observer.error(e);
            },
            complete() {
              observer.complete();
            },
          });
        },
        error(e) {
          observer.error(e);
        },
        complete() {
          observer.complete();
        },
      });
    });
  }
}
