import { Component, OnInit, Input } from '@angular/core';

// import { SlideInOutAnimation } from '../../../assets/animations';

@Component({
	selector: 'admin-new-trial-card',
	templateUrl: './admin-new-trial-card.component.html',
	styleUrls: ['./admin-new-trial-card.component.scss'],
	// animations: [SlideInOutAnimation]
})
export class AdminNewTrialCardComponent implements OnInit {
	@Input() heading: string;
	// @Input() animationState: string = 'right';

	ngOnInit() {
	}
}
