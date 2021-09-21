import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AdminNewTrialComponent } from './admin-new-trial.component';

import { ApiService } from '../../services/api.service';
import { DialogService } from '../../services/dialog.service';
import { SessionService } from '../../services/session.service';

import axios from 'axios';


@Component({
	selector: 'step-summary',
	templateUrl: './summary.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialSummaryStepComponent {
	@Input() parent: AdminNewTrialComponent;
	@Input() groups: FormArray;
	@Input() features: FormArray;
	@Input() surveys: FormArray;
	@Input() basicInfoStepForm: FormGroup;
	@Input() trialGroupsStepForm: FormGroup;
	@Input() surveyQuestionsStepForm: FormGroup;

	_submitting:boolean = false;

	constructor(
		private api: ApiService,
		private dialog: DialogService,
		private router: Router,
		private session: SessionService
	) { }

	async postNewTrial(event) {
		this._submitting = true;
		//
		let user = await this.session.getUser();
		//
		let trial = this.basicInfoStepForm.value;
		// add groups
		trial.groups = this.groups.value;
		// remove auto-generated blank FEATURE
		trial.features = this.features.value.filter( i => i.feature_name.length > 0 );
		// remove auto-generated blank SURVEY
		trial.surveys = this.surveys.value.filter( i => i.survey_name.length > 0 );
		// remove auto-generated blank QUESTIONS
		trial.surveys.map( s =>
			s.survey_questions = s.survey_questions.filter( i => i.question_text.length > 0 )
		);
		// send data
		const config = {
			headers: {'Authorization': `Bearer ${ this.session.access_token }`}
		};
		const data = {
			trial: JSON.stringify(trial)
		};

		axios.post( this.api.newTrial, data, config)
		.then( (response) => {
			if( response.data.status !== 200 ) {
				let message = response.data.message || "No error message was specified.";
				this.dialog.open( "Creating New Trial Failed", message );
				this._submitting = true;
			} else {
				const ret:Subscription = this.dialog.open( "New Trial Created", `Your trial has been created. The ID of your trial is: ${response.data.tid}.\nIt has ${response.data.groups} groups, ${response.data.features} features, ${response.data.surveys} surveys, and ${response.data.questions} questions.` )
				.subscribe( val => {
					ret.unsubscribe();
					this.basicInfoStepForm.markAsUntouched();
					this.trialGroupsStepForm.markAsUntouched();
					this.surveyQuestionsStepForm.markAsUntouched();
					this.router.navigateByUrl(`/trial-details/${response.data.tid}`);
				});
			}
		})
		.catch( (error) => {
			console.warn(error);
		});
	}

}
