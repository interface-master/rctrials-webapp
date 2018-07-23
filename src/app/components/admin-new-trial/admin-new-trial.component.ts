import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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

	constructor(
		private route: ActivatedRoute,
		// private session: SessionService
		// private spinnerService: SpinnerService
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
		});
	}

	createGroup(id: number): FormGroup {
		return this.formBuilder.group({
			group_id: [id],
			group_name: [''],
			group_size: ['auto'],
			group_size_n: [''],
			// grp_n_features: [''],
			// grp_n_surveys: ['']
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
		})
	}

	changeInput(event: any, index?: number) {
		// console.log('event:',event);
		this.groups = this.newTrialForm.get('groups') as FormArray;
		this.features = this.newTrialForm.get('features') as FormArray;

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
					this.surveys.push( this.createSurvey( this.surveys.length ) );
				}
				if( ary.length > 2
					&& ary[ary.length-1] == 0
					&& ary[ary.length-2] == 0
				) {
					this.surveys.removeAt( this.surveys.length-1 );
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
		// output
		console.log('creating a new trial...',trial);
	}

}
