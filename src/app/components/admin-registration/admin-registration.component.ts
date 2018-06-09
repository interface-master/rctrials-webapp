import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SessionService } from '../../services/session.service';

import { User } from '../../models/user.model';


@Component({
	selector: 'admin-registration',
	templateUrl: './admin-registration.component.html',
	styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent implements OnInit {
	private title:string = 'Researcher Registration';
	private name:string = '';
	private role:string = 'admin';

	regform: FormGroup;
	userInfo: User;

	constructor(private session: SessionService) {
	}

	ngOnInit() {
		// set up the form
		this.regform = new FormGroup({
			email: new FormControl(''),
			pass: new FormControl(''),
			salt: new FormControl(''),
			hash: new FormControl('')
		});
		this.userInfo = new User();
		// set up data binding
		this.session.currentRegistrationForm.subscribe(
			loginForm => {
				this.regform.setValue(loginForm.value);
			}
		)
	}

	changeInputReg(event: any) {
		this.session.updateRegistrationForm(this.regform)
	}

	changeInputUser(event: any) {
		this.userInfo.name = this.name;
		this.userInfo.role = this.role;
		this.session.updateUserInfo(this.userInfo)
	}

	register(event) {
		this.session.register();
	}

}
