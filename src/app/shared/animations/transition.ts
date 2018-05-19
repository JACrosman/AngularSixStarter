import {
  trigger,
  animate,
  style,
  group,
  query,
  transition
} from '@angular/animations';

export const routerTransition =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('routerTransition', [
    // route 'enter and leave (<=>)' transition
    transition('*<=>*', [
      // css styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate('0.2s', style({ opacity: 1 }))
    ])
  ]);
