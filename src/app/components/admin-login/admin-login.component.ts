import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
	private title:string = 'Researcher Login';

	regform: FormGroup;

	constructor(
		private session: SessionService
	) { }

	ngOnInit() {
		// set up form
		this.regform = new FormGroup({
			email: new FormControl(''),
			pass: new FormControl(''),
			salt: new FormControl(''),
			hash: new FormControl('')
		});
		// set up data binding
		this.session.currentRegistrationForm.subscribe(
			loginForm => {
				this.regform.setValue(loginForm.value);
			}
		)
	}

	changeInput(event: any) {
		this.session.updateRegistrationForm(this.regform)
	}

	login(event) {
		this.session.login();
	}

}
