import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AdminNewTrialComponent } from './admin-new-trial.component';

@Component({
	selector: 'step-basic-info',
	templateUrl: './basic-info.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialBasicInfoStepComponent {
	@Input() parent: AdminNewTrialComponent;
	@Input() parentForm: FormGroup;

	private start_at = [
		new Date(), // min for reg open
		new Date(), // min for reg close
		new Date(), // min for trial start
		new Date()  // min for trial end
	];

	updateDates(event) {
		let eventDate = new Date(event.value);
		let tomorrow = new Date();
		tomorrow.setDate(eventDate.getDate() + 1);
		switch( event.targetElement.name ) {
			case 'regopen':
				this.start_at[1] = tomorrow;
				break;
			case 'regclose':
				this.start_at[2] = event.value;
				break;
			case 'trialstart':
				this.start_at[3] = tomorrow;
				break;
		}
	}
}
