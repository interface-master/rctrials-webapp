import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { AdminNewTrialComponent } from './admin-new-trial.component';

@Component({
	selector: 'step-trial-groups',
	templateUrl: './trial-groups.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialTrialGroupsStepComponent {
	@Input() parent: AdminNewTrialComponent;
	@Input() parentForm: FormGroup;
	// @Input() groups: FormArray;

	changeGroupsCount(event:any) {
		const n = event.target.value;
		const groups = <FormArray>this.parentForm.get('groups');
		for( let i = groups.length; i < n; i++ ) {
			groups.push( this.parent.createGroup( groups.length ) );
		}
		for( let i = groups.length; i >= n; i-- ) {
			groups.removeAt( i );
		}
	}

	// TODO: implement this vvv
	changeGroupSize(event:any, index?:number) {
		const t = event.target;
		const groups = <FormArray>this.parentForm.get('groups');
		const this_group = <FormGroup>groups.controls[index];
		const this_group_size = this_group.controls['group_size'];
		if( this_group_size ) {
			if( !isNaN(parseInt(t.value)) ) {
				// set to manual
				this_group_size.setValue('manual');
			} else {
				// set to auto
				this_group_size.setValue('auto');
			}
		}
	}

	validate(event) {
		console.log('validating trial groups',this.parentForm);
		this.parent.doNotRepeatGroups(this.parentForm);
		console.log("valid?",this.parentForm.valid);
		// submit if valid
		if( this.parentForm.valid ) {
			console.log('.. step 2 valid');
			return true;
		} else {
			console.log('.. invalid');
			return false;
		}
	}

}
