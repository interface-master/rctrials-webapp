import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { AdminNewTrialComponent } from './admin-new-trial.component';

@Component({
	selector: 'step-survey-questions',
	templateUrl: './survey-questions.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialSurveyQuestionsStepComponent {
	@Input() parent: AdminNewTrialComponent;
	@Input() parentForm: FormGroup;
	@Input() surveys: FormArray;
	@Input() groups: FormArray;

	private _editingSurvey: number;

	setEditingSurvey( n:number ) {
		this._editingSurvey = n;
	}

	changeSurveyName( event:any ) {
		var ary = [];
		this.surveys.value.forEach( i => {
			(i['survey_name'].trim().length > 0) ? ary.push(1) : ary.push(0);
		});
		if( ary[ary.length-1] == 1 ) {
			this.surveys.push( this.parent.createSurvey( this.parent.getNextSurveyID() ) );
		}
		if( ary.length > 2
			&& ary[ary.length-1] == 0
			&& ary[ary.length-2] == 0
		) {
			this.surveys.removeAt( this.surveys.length-1 );
		}
	}

	changeGroupAssignment(event: any, ary: FormControl, idx_group: number) {
		if( event.target.checked == true ) {
			ary.value.push( idx_group );
			ary.value.sort();
		} else {
			ary.value.splice( ary.value.indexOf(idx_group), 1 );
		}
	}

	changeQuestionText( event:any ) {
		var ary = [];
		// figure out which survey is being edited
		let survey = <FormGroup>this.surveys.controls[ this._editingSurvey ];
		let questions = <FormArray>survey.get('survey_questions');
		questions.controls.forEach( q => {
			(q.get('question_text').value.trim().length > 0) ? ary.push(1) : ary.push(0);
		});
		if( ary[ary.length-1] == 1 ) {
			questions.push( this.parent.createSurveyQuestion( this.parent.getNextQuestionID() ) );
		}
		if( ary.length > 2
			&& ary[ary.length-1] == 0
			&& ary[ary.length-2] == 0
		) {
			questions.removeAt( questions.length-1 );
		}
	}

}
