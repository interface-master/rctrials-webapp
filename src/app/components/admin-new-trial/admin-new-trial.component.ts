import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
	selector: 'admin-new-trial',
	templateUrl: './admin-new-trial.component.html',
	styleUrls: ['./admin-new-trial.component.scss']
})
export class AdminNewTrialComponent implements OnInit {
	private title:string = 'New Trial';

	newTrialForm: FormGroup;

	constructor(
		// private session: SessionService
	) { }

	ngOnInit() {
		// set up the form
		this.newTrialForm = new FormGroup({
			title: new FormControl(''),
			regopen: new FormControl(''),
			regclose: new FormControl(''),
			trialstart: new FormControl(''),
			trialend: new FormControl(''),
		});
		// set up data binding
		// this.session.currentRegistrationForm.subscribe(
		// 	loginForm => {
		// 		this.regform.setValue(loginForm.value);
		// 	}
		// )
	}

	changeInputReg(event: any) {
		// this.session.updateNewTrialForm(this.newTrialForm)
	}

	newTrial(event) {
		console.log('creating a new trial...');
	// 	this.session.register();
	}

}
