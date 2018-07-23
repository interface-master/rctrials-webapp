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
		this.newTrialForm = this.formBuilder.group({
			title: [''],
			regopen: [''],
			regclose: [''],
			trialstart: [''],
			trialend: [''],
			trialtype: ['simple'],
			groups: this.groups,
			features: this.features,
		});
	}

	createGroup(id: number): FormGroup {
		return this.formBuilder.group({
			grp_n_id: [id],
			grp_n_name: [''],
			grp_n_size: ['auto'],
			grp_n_size_n: [''],
			// grp_n_features: [''],
			// grp_n_surveys: ['']
		});
	}

	createFeature(id: number): FormGroup {
		return this.formBuilder.group({
			feat_n_id: [id],
			feat_n_name: [''],
			feat_n_grp_n: [[]],
		});
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
					this.groups.removeAt(i);
				}
				break;

			// when changing group size:
			case 'grp_n_size_n':
				let t = event.target;
				let this_group = <FormGroup>this.groups.controls[index];
				const this_group_size = <FormControl>this_group.controls['grp_n_size'];
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

			case 'feat_n_name':
				let ary = [];
				this.features.value.forEach( i => {
					(i['feat_n_name'].trim().length > 0) ? ary.push(1) : ary.push(0);
				});
				if( ary[ary.length-1] == 1 ) {
					this.features.push( this.createFeature(this.features.length) );
				}
				if( ary.length > 2
					&& ary[ary.length-1] == 0
					&& ary[ary.length-2] == 0
				) {
					this.features.removeAt( this.features.length-1 );
				}
				break;

			default:
				// update form group
				// this.session.updateNewTrialForm(this.newTrialForm)
		}
	}

	changeFeatureGroup(event: any, idx_feature?: number, idx_group?: number) {
		// console.log(idx_feature, idx_group, 'assignFeatures:', event);
		// console.log('features:',this.features.value[idx_feature]['feat_n_grp_n']);
		const ary = this.features.value[idx_feature]['feat_n_grp_n'];
		if( event.target.checked == true ) {
			ary.push( idx_group );
		} else {
			ary.splice( ary.indexOf(idx_group), 1 );
		}
	}

	newTrial(event) {
		let trial = this.newTrialForm.value;
		// remove auto-generated blank feature
		trial.features = trial.features.filter( i => i.feat_n_name.length > 0 );
		// output
		console.log('creating a new trial...',trial);
	}

}
