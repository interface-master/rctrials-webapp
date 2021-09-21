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
	public trialFeaturesStepForm: FormGroup;
	public surveyQuestionsStepForm: FormGroup;
	public groups: FormArray;
	public features: FormArray;
	public surveys: FormArray;

	public get formsTouched():boolean {
		return this.newTrialForm.touched
			|| this.basicInfoStepForm.touched
			|| this.trialGroupsStepForm.touched
			|| this.trialFeaturesStepForm.touched
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
			regclose: new FormControl(''),
			trialstart: new FormControl('',Validators.required),
			trialend: new FormControl(''),
			trialtype: ['simple'],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});




		const test = JSON.parse("{\"title\":\"Test Trial\",\"regopen\":\"2021-09-01T04:00:00.000Z\",\"regclose\":\"\",\"trialstart\":\"2021-09-02T04:00:00.000Z\",\"trialend\":\"\",\"trialtype\":\"simple\",\"timezone\":\"America/Toronto\",\"groups\":[{\"group_id\":0,\"group_name\":\"Control\",\"group_size\":\"auto\",\"group_size_n\":\"0\"},{\"group_id\":1,\"group_name\":\"Experiment A\",\"group_size\":\"auto\",\"group_size_n\":\"0\"},{\"group_id\":2,\"group_name\":\"Experiment B\",\"group_size\":\"auto\",\"group_size_n\":\"0\"},{\"group_id\":3,\"group_name\":\"Experiment C\",\"group_size\":\"auto\",\"group_size_n\":\"0\"}],\"features\":[{\"feature_id\":0,\"feature_name\":\"Gamification\",\"feature_groups\":[1,3]},{\"feature_id\":1,\"feature_name\":\"Communication\",\"feature_groups\":[2,3]}],\"surveys\":[{\"survey_id\":0,\"survey_name\":\"Demographics\",\"survey_groups\":[0,1,2,3],\"survey_pre\":true,\"survey_during\":false,\"survey_post\":false,\"survey_interval\":1,\"survey_frequency\":\"days\",\"survey_questions\":[{\"question_id\":0,\"question_text\":\"What's your age group:\",\"question_type\":\"radio\",\"question_options\":\"< 18 | 18 - 24 | 25 - 34 | 35 - 44 | 45 - 54 | 55 - 64 | 65 - 74 | 75 - 84 | 85 + | Prefer not to say\"},{\"question_id\":2,\"question_text\":\"What gender do you most identify with:\",\"question_type\":\"radio\",\"question_options\":\"Female | Male | Non-binary | Other | Prefer not to say\"}]},{\"survey_id\":1,\"survey_name\":\"How do you like Gamification?\",\"survey_groups\":[1,3],\"survey_pre\":false,\"survey_during\":false,\"survey_post\":true,\"survey_interval\":3,\"survey_frequency\":\"days\",\"survey_questions\":[{\"question_id\":1,\"question_text\":\"Did you like the gamification feature?\",\"question_type\":\"text\",\"question_options\":\"\"}]},{\"survey_id\":2,\"survey_name\":\"How do you like Communication?\",\"survey_groups\":[2,3],\"survey_pre\":false,\"survey_during\":false,\"survey_post\":true,\"survey_interval\":1,\"survey_frequency\":\"days\",\"survey_questions\":[{\"question_id\":4,\"question_text\":\"How did you like the communication features?\",\"question_type\":\"text\",\"question_options\":\"\"}]}]}");

		/*
		this.basicInfoStepForm.get('title').setValue( test.title );
		this.basicInfoStepForm.get('regopen').setValue( test.regopen );
		this.basicInfoStepForm.get('trialstart').setValue( test.trialstart );
		this.groups = this.formBuilder.array(
			test.groups.map( g => this.createGroupWithName( g.group_id, g.group_name ) )
		);
		this.features = this.formBuilder.array(
			test.features.map( f => this.createFeatureWithGroups( f.feature_id, f.feature_name, f.feature_groups ) )
		);
		this.surveys = this.formBuilder.array([
			...test.surveys.map( s => this.createSurveyWithJSON( s ) ),
			this.createSurvey( this.getNextSurveyID() )
		]);
		/**/

		this.trialGroupsStepForm = this.formBuilder.group({
			groups: this.groups,
			features: this.features,
		},{
			validator: this.doNotRepeatGroups
		});
		this.trialFeaturesStepForm = this.formBuilder.group({
			features: this.features,
		},{
			validator: this.doNotRepeatFeatures
		});
		this.surveyQuestionsStepForm = this.formBuilder.group({
			surveys: this.surveys,
		});

	}

	public createGroupWithName(id: number, name: string): FormGroup {
		return this.formBuilder.group({
			group_id: [id],
			group_name: new FormControl(name,Validators.required),
			group_size: ['auto'],
			group_size_n: ['0'],
		});
	}

	public createGroup(id: number): FormGroup {
		return this.createGroupWithName(id, '');
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

	doNotRepeatFeatures(ctx:any):{[key:string]:boolean} {
		const features = <FormArray>ctx.get('features');
		if( features.controls.length > 1 ) {
			features.controls
					.map( g => {
						const inp = (<FormGroup>g).controls.feature_name;
						inp.updateValueAndValidity({onlySelf:true,emitEvent:false});
						return inp.value;
					})
					.reduce( (a,c,i) => {
						if( !a.includes(c) ) a.push(c);
						else (<FormGroup>features.controls[i]).controls.feature_name.setErrors({repeated:true});
						return a;
					}, [] );
		}
		return null;
	}

	public createFeature(id: number): FormGroup {
		return this.createFeatureWithGroups( id, '', [] );
	}

	public createFeatureWithGroups(id: number, name: string, groups: number[]): FormGroup {
		return this.formBuilder.group({
			feature_id: [id],
			feature_name: [name],
			feature_groups: [groups],
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

	createSurveyWithJSON( obj: any ): FormGroup {
		return this.formBuilder.group({
			survey_id: [ obj.survey_id ],
			survey_name: [ obj.survey_name ],
			survey_groups: [ obj.survey_groups ],
			survey_pre: [ obj.survey_pre ], // is pre-test
			survey_during: [obj.survey_during ], // is during-test
			survey_post: [ obj.survey_post ], // is post-test
			survey_interval: [ obj.survey_interval ], // interval
			survey_frequency: [ obj.survey_frequency ], // days, weeks, months
			survey_questions: this.createSurveyQuestionsWithJSON( obj.survey_questions ),
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

	createSurveyQuestionsWithJSON( obj: any ): FormArray {
		return this.formBuilder.array([
			...obj.map( q => this.formBuilder.group({
				question_id: [ q.question_id ],
				question_text: [ q.question_text ],
				question_type: [ q.question_type ],
				question_options: [ q.question_options ]
			}) ),
			this.createSurveyQuestion( this.getNextQuestionID() )
		]);
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

	// TODO: the code below should be used when the features are brought back
	// changeInput(event: any, index?: number) {
	// 	switch( event.target.name ) {
	//
	// 		case 'feature_name':
	// 			var ary = [];
	// 			this.features.value.forEach( i => {
	// 				(i['feature_name'].trim().length > 0) ? ary.push(1) : ary.push(0);
	// 			});
	// 			if( ary[ary.length-1] == 1 ) {
	// 				this.features.push( this.createFeature( this.features.length ) );
	// 			}
	// 			if( ary.length > 2
	// 				&& ary[ary.length-1] == 0
	// 				&& ary[ary.length-2] == 0
	// 			) {
	// 				this.features.removeAt( this.features.length-1 );
	// 			}
	// 			break;
	//
	// 	}
	// }

}
