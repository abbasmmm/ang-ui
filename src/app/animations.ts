import { trigger, state, style, transition, animate, animateChild, query, keyframes, sequence } from '@angular/animations';

export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'width': '60px'
    })
  ),
  state('open',
    style({
      'width': '220px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '60px'
    })
  ),
  state('open',
    style({
      'margin-left': '220px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);

export const flipCard = trigger('flipCard', [
  state('front',
    style({
      'transform': 'rotateY(360deg)'
    })
  ),
  state('back',
    style({
      'transform': 'rotateY(180deg)'
    })
  ),
  transition('front => back', animate('250ms ease-in')),
  transition('back => front', animate('250ms ease-in')),
]);

export const animateText = trigger('animateText', [
  transition('hide=>show', animate('500ms', keyframes([
    style({ transform: 'scale(0)', display: 'block' }),
    style({ transform: 'scale(0.5)' }),
    style({ transform: 'scale(0.75)' }),
    style({ transform: 'scale(1.2)' }),
    style({ transform: 'scale(1)' })
  ]))),
  transition('show=>hide', animate('10ms', keyframes([
    style({ display: 'none' })
  ]))),
]);

export const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".5s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
        animate(".5s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);

export const launchAnimation =
  trigger('launchAnimation', [
    transition('void => *', [
      style({ opacity: '0', transform: 'translateY(300px)', 'box-shadow': 'none', 'height': 'calc(100vh - 800px)' }),
      sequence([
        animate(".2s ease", style({ opacity: '.2', transform: 'translateY(0)', 'box-shadow': 'none', 'height': 'calc(100vh - 800px)' })),
        animate(".5s ease", style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]);

export const expandMenu =
  trigger('expandMenu', [
    state('expand',
      style({
        'height': 'inherit',
        'transition': 'height 1s'
      })
    ),
    state('collapse',
      style({
        'height': '0',
        'transition': 'height 1s'

      })
    ),
    transition('expand => collapse', animate('0s ease-in')),
    transition('collapse => expand', animate('0s ease-in')),
  ])

  export const rotateChevron =
  trigger('rotateChevron', [
    state('expand',
      style({
        'transform': 'rotate(90deg)'
      })
    ),
    state('collapse',
      style({
        'transform': 'rotate(0)'
      })
    ),
    transition('expand => collapse', animate('250ms ease-in')),
    transition('collapse => expand', animate('250ms ease-in')),
  ])

  export const topNavAnimation =
  trigger('topNavAnimation', [
    state('expand',
      style({
        'max-height': 'calc(100vh - 80px)',
        'min-height': 'calc(300px)'
      })
    ),
    state('collapse',
      style({
        'max-height': '0',
        'min-height': '0'
      })
    ),
    transition('expand => collapse', animate('500ms ease-in')),
    transition('collapse => expand', animate('500ms ease-in')),
  ])