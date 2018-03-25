import Observable from './Observable';

export default function() {
  //mergeMap
  const array$ = Observable.fromArray([1, 2, 3]);
  const promise = val => {
    return new Promise(resolve => {
      setTimeout(() => resolve(val), 3000);
    });
  };

  const data$ = Observable
    .fromArray([1, 2, 3])
    .mergeMap(val => Observable.fromPromise(promise(val))
  ).subscribe({
    next(val) { console.log(val) },
    complete() { console.log('done') },
    error(err) { console.log(err) }
  });
}
