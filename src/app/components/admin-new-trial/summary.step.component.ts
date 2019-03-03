import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
	selector: 'step-summary',
	templateUrl: './summary.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialSummaryStepComponent {
	@Input() parentForm: FormGroup;
	@Input() groups: FormArray;
	@Input() surveys: FormArray;
}
