import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';

import axios from 'axios';

@Component({
	selector: 'admin-new-trial',
	templateUrl: './admin-new-trial.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialComponent implements OnInit {
	public title:string = 'New Trial';

	public newTrialForm: FormGroup;
	public basicInfoStepForm: FormGroup;
	public trialGroupsStepForm: FormGroup;
	public surveyQuestionsStepForm: FormGroup;
	public groups: FormArray;
	public features: FormArray;
	public surveys: FormArray;

	public get formsTouched():boolean {
		return this.newTrialForm.touched
			|| this.basicInfoStepForm.touched
			|| this.trialGroupsStepForm.touched
			|| this.surveyQuestionsStepForm.touched;
	}

	constructor(
		private api: ApiService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private session: SessionService
	) {
		this.title = this.route.snapshot.data[0].pageName;
	}

	ngOnInit() {
		// set up the form
		this.groups = this.formBuilder.array([ this.createGroup(0) ]);
		this.features = this.formBuilder.array([ this.createFeature(0) ]);
		this.surveys = this.formBuilder.array([ this.createSurvey(0) ]);
		this.newTrialForm = this.formBuilder.group({
		});
		this.basicInfoStepForm = this.formBuilder.group({
			title: new FormControl('',Validators.required),
			regopen: new FormControl('',Validators.required),
			regclose: new FormControl('',Validators.required),
			trialstart: new FormControl('',Validators.required),
			trialend: new FormControl('',Validators.required),
			trialtype: ['simple'],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});
		this.trialGroupsStepForm = this.formBuilder.group({
			groups: this.groups,
			features: this.features,
		},{
			validator: this.doNotRepeatGroups
		});
		this.surveyQuestionsStepForm = this.formBuilder.group({
			surveys: this.surveys,
		});
	}

	public createGroup(id: number): FormGroup {
		return this.formBuilder.group({
			group_id: [id],
			group_name: new FormControl('',Validators.required),
			group_size: ['auto'],
			group_size_n: [''],
		});
	}

	doNotRepeatGroups(ctx:any):{[key:string]:boolean} {
		const groups = <FormArray>ctx.get('groups');
		if( groups.controls.length > 1 ) {
			groups.controls
					.map( g => {
						const inp = (<FormGroup>g).controls.group_name;
						inp.updateValueAndValidity({onlySelf:true,emitEvent:false});
						return inp.value;
					})
					.reduce( (a,c,i) => {
						if( !a.includes(c) ) a.push(c);
						else (<FormGroup>groups.controls[i]).controls.group_name.setErrors({repeated:true});
						return a;
					}, [] );
		}
		return null;
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
		switch( event.target.name ) {

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
				break;

			case 'question_text':
				break;
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
			headers: {'Authorization': `Bearer ${ this.session.access_token }`}
		};
		const data = {
			trial: JSON.stringify(trial)
		};
		axios.post( this.api.newTrial, data, config) // TODO: remove hard-coded URLs into a service
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

}
