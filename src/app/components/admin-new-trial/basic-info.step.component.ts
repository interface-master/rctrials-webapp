import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'step-basic-info',
	templateUrl: './basic-info.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialBasicInfoStepComponent {
	@Input() parentForm: FormGroup;
}
