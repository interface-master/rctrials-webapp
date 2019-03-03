import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
	selector: 'step-trial-groups',
	templateUrl: './trial-groups.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialTrialGroupsStepComponent {
	@Input() parentForm: FormGroup;
	@Input() groups: FormArray;
}
