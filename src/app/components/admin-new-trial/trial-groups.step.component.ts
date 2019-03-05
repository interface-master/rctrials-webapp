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
		console.log('got groups:',groups);
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
		// touch each input to validate it
		// Object.keys( this.parentForm.controls ).forEach( key => {
			// let control = this.parentForm.get(key);
			// control.markAsTouched({onlySelf:true});
		// });
		// compare group names to ensure uniqueness
		// const groups = <FormArray>this.parentForm.get('groups');
		// groups.controls.map( g => {
		// 	const inp = (<FormGroup>g).controls.group_name;
		// 	inp.updateValueAndValidity({onlySelf:true,emitEvent:false});
		// });
		// const names = groups.controls
		// 		.map( g => (<FormGroup>g).controls.group_name.value )
		// 		.reduce( (a,c,i) => {
		// 			if( !a.includes(c) ) a.push(c);
		// 			else (<FormGroup>groups.controls[i]).controls.group_name.setErrors({repeated:true});
		// 			return a;
		// 		}, [] );
		// groups.controls.forEach( g => {
		// 	let input = (<FormGroup>g).controls.group_name;
		// 	console.log('comparing',names,input.value);
		// 	if( names.includes(input.value) ) {
		// 		console.log("ERR");
		// 		input.setErrors({repeated:true});
		// 	} else {
		// 		input.updateValueAndValidity({onlySelf:true,emitEvent:false});
		// 	}
		// });
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
