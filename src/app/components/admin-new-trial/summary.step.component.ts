import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { AdminNewTrialComponent } from './admin-new-trial.component';

@Component({
	selector: 'step-summary',
	templateUrl: './summary.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialSummaryStepComponent {
	@Input() parent: AdminNewTrialComponent;
	// @Input() parentForm: FormGroup;
	@Input() groups: FormArray;
	@Input() surveys: FormArray;
	@Input() basicInfoStepForm: FormGroup;
	@Input() trialGroupsStepForm: FormGroup;
	@Input() surveyQuestionsStepForm: FormGroup;
}
