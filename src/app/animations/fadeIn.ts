import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  state(
    '*',
    style({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 5,
      overflow: 'hidden auto',
    })
  ),
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '.3s ease-in-out',
      style({
        opacity: 1,
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '.3s ease-in-out',
      style({
        opacity: 0,
      })
    ),
  ]),
]);
