import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from '../../services/session.service';

import { User } from '../../models/user.model';


@Component({
	selector: 'admin-registration',
	templateUrl: './admin-registration.component.html',
	styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent implements OnInit {
	private title:string = 'Researcher Registration';

	private regform:FormGroup;
	private nameform:FormGroup;
	userInfo: User;

	constructor(
		private session: SessionService
	) { }

	ngOnInit() {
		// set up the form
		this.regform = this.session.getRegistrationForm();
		this.nameform = new FormGroup({
			name: new FormControl('',Validators.required)
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
		this.userInfo.name = this.nameform.value;
		this.session.updateUserInfo(this.userInfo)
	}

	register(event) {
		// update all fields
		this.nameform.controls.name.markAsTouched({onlySelf:true});
		Object.keys( this.regform.controls ).forEach( key => {
		  let control = this.regform.get(key);
		  control.markAsTouched({onlySelf:true});
		});
		// submit if valid
		if( this.nameform.valid && this.regform.valid ) {
			this.session.register();
		}
	}

}
