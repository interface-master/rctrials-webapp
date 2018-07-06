import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';


@Component({
	selector: 'admin-new-trial',
	templateUrl: './admin-new-trial.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialComponent implements OnInit {
	private title:string = 'New Trial';

	newTrialForm: FormGroup;
	groups: FormArray;

	constructor(
		// private session: SessionService
		// private spinnerService: SpinnerService
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		// set up the form
		this.newTrialForm = new FormGroup({
			title: new FormControl(''),
			regopen: new FormControl(''),
			regclose: new FormControl(''),
			trialstart: new FormControl(''),
			trialend: new FormControl(''),
			trialtype: new FormControl('simple'),
			groups: this.formBuilder.array([ this.createItem() ]),
		});
		// set up data binding
		// this.session.currentRegistrationForm.subscribe(
		// 	loginForm => {
		// 		this.regform.setValue(loginForm.value);
		// 	}
		// )
	}

	changeInput(event: any) {
		console.log('event:',event);
		this.groups = this.newTrialForm.get('groups') as FormArray;
		console.log("groups1:",this.groups);
		switch( event.target.name ) {
			case 'ngroups':
				let n = event.target.value;
				for( let i = this.groups.length; i < n; i++ ) {
					console.log('pushing')
					this.groups.push( this.createItem() );
				}
				for( let i = this.groups.length; i >= n; i-- ) {
					console.log('removing',i)
					this.groups.removeAt(i);
				}
				console.log('groups2:', this.groups );
				break;

			default:
				// update form group
				// this.session.updateNewTrialForm(this.newTrialForm)
		}
	}

	createItem(): FormGroup {
		return this.formBuilder.group({
			name: '',
			size: '',
			sizen: '',
			experiments: [],
			surveys: []
		});
	}

	newTrial(event) {
		console.log('creating a new trial...',this.newTrialForm.value);
	}

}
