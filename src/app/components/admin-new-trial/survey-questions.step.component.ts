import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
	selector: 'step-survey-questions',
	templateUrl: './survey-questions.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialSurveyQuestionsStepComponent {
	@Input() parentForm: FormGroup;
	@Input() surveys: FormArray;
}
