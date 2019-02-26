import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SessionService } from '../../services/session.service';

import axios from 'axios';

@Component({
	selector: 'admin-new-trial',
	templateUrl: './admin-new-trial.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialComponent implements OnInit {
	private title:string = 'New Trial';

	public newTrialForm: FormGroup;
	public groups: FormArray;
	public features: FormArray;
	public surveys: FormArray;

	private _editingSurvey: number;

	constructor(
		private route: ActivatedRoute,
		private session: SessionService,
		private formBuilder: FormBuilder
	) {
		this.title = this.route.snapshot.data[0].pageName;
	}

	ngOnInit() {
		// set up the form
		this.groups = this.formBuilder.array([ this.createGroup(0) ]);
		this.features = this.formBuilder.array([ this.createFeature(0) ]);
		this.surveys = this.formBuilder.array([ this.createSurvey(0) ]);
		this.newTrialForm = this.formBuilder.group({
			title: [''],
			regopen: [''],
			regclose: [''],
			trialstart: [''],
			trialend: [''],
			trialtype: ['simple'],
			groups: this.groups,
			features: this.features,
			surveys: this.surveys,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});
	}

	createGroup(id: number): FormGroup {
		return this.formBuilder.group({
			group_id: [id],
			group_name: [''],
			group_size: ['auto'],
			group_size_n: [''],
		});
	}

	createFeature(id: number): FormGroup {
		return this.formBuilder.group({
			feature_id: [id],
			feature_name: [''],
			feature_groups: [[]],
		});
	}

	createSurvey(id: number): FormGroup {
		return this.formBuilder.group({
			survey_id: [id],
			survey_name: [''],
			survey_groups: [[]],
			survey_pre: [false], // is pre-test
			survey_during: [false], // is during-test
			survey_post: [false], // is post-test
			survey_interval: [1], // interval
			survey_frequency: ['days'], // days, weeks, months
			survey_questions: this.formBuilder.array([ this.createSurveyQuestion( this.getNextQuestionID() ) ]),
		})
	}

	createSurveyQuestion(id: number): FormGroup {
		return this.formBuilder.group({
			question_id: [id],
			question_text: [''],
			question_type: ['text'],
			question_options: [''],
		})
	}

	getNextSurveyID(): number {
		if( !this.surveys || this.surveys.controls.length <= 0) return 0;
		let allIds = this.surveys.value
			.map( survey => survey.survey_id )
			.filter( i => i===0||i );
		return Math.max( ...allIds ) + 1;
	}

	getNextQuestionID(): number {
		if( !this.surveys || this.surveys.controls.length <= 0) return 0;
		let allIds = this.surveys.value
			.map( survey => survey['survey_questions'].map( q => q.question_id ) )
			.reduce( (a,c) => [...a, ...c] )
			.filter( i => i===0||i );
		return Math.max( ...allIds ) + 1;
	}

	changeInput(event: any, index?: number) {
		// console.log('event:',event);
		// this.groups = this.newTrialForm.get('groups') as FormArray;
		// this.features = this.newTrialForm.get('features') as FormArray;
		// this.surveys = this.newTrialForm.get('surveys') as FormArray;

		switch( event.target.name ) {
			// when changing the number of groups:
			case 'ngroups':
				let n = event.target.value;
				for( let i = this.groups.length; i < n; i++ ) {
					this.groups.push( this.createGroup( this.groups.length ) );
				}
				for( let i = this.groups.length; i >= n; i-- ) {
					this.groups.removeAt( i );
				}
				break;

			// when changing group size:
			case 'group_size_n':
				let t = event.target;
				let this_group = <FormGroup>this.groups.controls[index];
				const this_group_size = <FormControl>this_group.controls['group_size'];
				if( this_group_size ) {
					if( !isNaN(parseInt(t.value)) ) {
						// set to manual
						this_group_size.setValue('manual');
					} else {
						// set to auto
						this_group_size.setValue('auto');
					}
				}
				break;

			case 'feature_name':
				var ary = [];
				this.features.value.forEach( i => {
					(i['feature_name'].trim().length > 0) ? ary.push(1) : ary.push(0);
				});
				if( ary[ary.length-1] == 1 ) {
					this.features.push( this.createFeature( this.features.length ) );
				}
				if( ary.length > 2
					&& ary[ary.length-1] == 0
					&& ary[ary.length-2] == 0
				) {
					this.features.removeAt( this.features.length-1 );
				}
				break;

			case 'survey_name':
				var ary = [];
				this.surveys.value.forEach( i => {
					(i['survey_name'].trim().length > 0) ? ary.push(1) : ary.push(0);
				});
				if( ary[ary.length-1] == 1 ) {
					this.surveys.push( this.createSurvey( this.getNextSurveyID() ) );
				}
				if( ary.length > 2
					&& ary[ary.length-1] == 0
					&& ary[ary.length-2] == 0
				) {
					this.surveys.removeAt( this.surveys.length-1 );
				}
				break;

			case 'question_text':
				var ary = [];
				// figure out which survey is being edited
				let survey = <FormGroup>this.surveys.controls[ this._editingSurvey ];
				let questions = <FormArray>survey.get('survey_questions');
				questions.controls.forEach( q => {
					(q.get('question_text').value.trim().length > 0) ? ary.push(1) : ary.push(0);
				});
				if( ary[ary.length-1] == 1 ) {
					questions.push( this.createSurveyQuestion( this.getNextQuestionID() ) );
				}
				if( ary.length > 2
					&& ary[ary.length-1] == 0
					&& ary[ary.length-2] == 0
				) {
					questions.removeAt( questions.length-1 );
				}
				break;

			default:
				// update form group
				// this.session.updateNewTrialForm(this.newTrialForm)
		}
	}

	changeGroupAssignment(event: any, ary: FormControl, idx_group: number) {
		// const ary = this.features.value[idx_feature]['feat_n_grp_n'];
		if( event.target.checked == true ) {
			ary.value.push( idx_group );
			ary.value.sort();
		} else {
			ary.value.splice( ary.value.indexOf(idx_group), 1 );
		}
	}

	newTrial(event) {
		let trial = this.newTrialForm.value;
		// remove auto-generated blank FEATURE
		trial.features = trial.features.filter( i => i.feature_name.length > 0 );
		// remove auto-generated blank SURVEY
		trial.surveys = trial.surveys.filter( i => i.survey_name.length > 0 );
		// remove auto-generated blank QUESTIONS
		trial.surveys.map( s =>
			s.survey_questions = s.survey_questions.filter( i => i.question_text.length > 0 )
		);
		// send data
		const config = {
			headers: {'Authorization': `Bearer ${ this.session.parseCookie( 'access_token' ) }`}
		};
		const data = {
			trial: JSON.stringify(trial)
		};
		axios.post('http://localhost/api/new/trial', data, config) // TODO: remove hard-coded URLs into a service
		.then( (response) => {
			if( response.data.status !== 200 ) {
				let message = response.data.message || "No error message was specified.";
				this.session.openDialog( "Creating New Trial Failed", message );
			} else {
				this.session.openDialog( "New Trial Created", `Your trial has been created. The ID of your trial is: ${response.data.tid}.\nIt has ${response.data.groups} groups, ${response.data.surveys} surveys, and ${response.data.questions} questions.` );
			}
		})
		.catch( (error) => {
			console.warn(error);
		});
	}

	setEditingSurvey( n: number ) {
		this._editingSurvey = n;
	}
}
