import Observable from './Observable';

export default function() {
  // turn click event to observable
  const button = document.getElementById('button');
  const click$ = Observable.fromEvent(button, 'click');

  const unsubscribe = click$.subscribe({
    next: () => console.log('clicked!'),
  });
  setTimeout(() => unsubscribe(), 30000);
}
