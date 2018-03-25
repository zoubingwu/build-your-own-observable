import Observable from './Observable';

export default function() {
  // basic exemple
  const dataStream$ = new Observable(observer => {
    observer.next(1);
    setTimeout(() => {
      observer.next(2);
      observer.complete();
    }, 2000);
    observer.next(3);
  });

  dataStream$.map(val => val * 10).subscribe({
    next: x => console.log(x),
    error: err => console.error(err),
    complete: () => console.log('done'),
  });
}
