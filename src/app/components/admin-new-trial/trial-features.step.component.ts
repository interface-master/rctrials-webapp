import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { AdminNewTrialComponent } from './admin-new-trial.component';

@Component({
	selector: 'step-trial-features',
	templateUrl: './trial-features.step.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialTrialFeaturesStepComponent {
	@Input() parent: AdminNewTrialComponent;
	@Input() parentForm: FormGroup;
	@Input() features: FormArray;
  @Input() groups: FormArray;

	changeFeaturesCount(event:any) {
		const n = event.target.value;
		const features = <FormArray>this.parentForm.get('features');
		for( let i = features.length; i < n; i++ ) {
			features.push( this.parent.createFeature( features.length ) );
		}
		for( let i = features.length; i >= n; i-- ) {
			features.removeAt( i );
		}
	}

  changeGroupAssignment(event: any, ary: FormControl, idx_group: number) {
    if( event.target.checked == true ) {
      if( !ary.value.includes( idx_group ) ) {
        ary.value.push( idx_group );
        ary.value.sort();
      }
    } else {
      ary.value.splice( ary.value.indexOf(idx_group), 1 );
    }
  }

}
