import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
	selector: 'admin-new-trial',
	templateUrl: './admin-new-trial.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialComponent implements OnInit {
	private title:string = 'New Trial';

	groups:any[] = [];

	newTrialForm: FormGroup;

	constructor(
		// private session: SessionService
		// private spinnerService: SpinnerService
	) { }

	ngOnInit() {
		// set up the form
		this.newTrialForm = new FormGroup({
			title: new FormControl(''),
			regopen: new FormControl(''),
			regclose: new FormControl(''),
			trialstart: new FormControl(''),
			trialend: new FormControl(''),
			ngroups: new FormControl(''),
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
		console.log("this.groups:",this.groups);
		switch( event.target.name ) {
			case 'ngroups':
				let n = event.target.value;
				for( let i = this.groups.length; i < n; i++ ) {
					this.groups.push({});
				}
				if( n < this.groups.length ) {
					this.groups.splice(n);
				}
				console.log('groups:', this.groups );
				console.log('this:',this);
				break;

			default:
				// update form group
				// this.session.updateNewTrialForm(this.newTrialForm)
		}
	}

	newTrial(event) {
		console.log('creating a new trial...');
	// 	this.session.register();
	}

}
