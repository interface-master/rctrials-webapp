import { trigger, state, style, transition,
	animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
	trigger('slideInOut', [
		state('left', style({
			'left': '-100%', 'opacity': '0'
		})),
		state('center', style({
			'left': '0px', 'opacity': '1'
		})),
		state('right', style({
			'left': '100%', 'opacity': '0'
		})),
		transition('right => center', [group([
			animate('500ms ease-in-out', style({
				'opacity': '1',
				'left': '0'
			})),
		])]),
		transition('center => left', [group([
			animate('500ms ease-in-out', style({
				'opacity': '0',
				'left': '-100%'
			})),
		])]),
		transition('left => center', [group([
			animate('500ms ease-in-out', style({
				'opacity': '1',
				'left': '0'
			})),
		])]),
		transition('center => right', [group([
			animate('500ms ease-in-out', style({
				'opacity': '0',
				'left': '100%'
			})),
		])]),
	]),
]
