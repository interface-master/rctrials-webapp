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

	validate(event) {
		console.log('validating basic info',this.parentForm);
		// Object.keys( this.parentForm.controls ).forEach( key => {
		// 	let control = this.parentForm.get(key);
		// 	control.markAsTouched({onlySelf:true});
		// });
		// submit if valid
		if( this.parentForm.valid ) {
			console.log('.. step 1 valid');
			return true;
		} else {
			console.log('.. invalid');
			return false;
		}
	}
}
