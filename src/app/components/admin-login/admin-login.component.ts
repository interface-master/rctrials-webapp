import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
	private title:string = 'Researcher Login';
	private _formSubscriber:any;

	regform: FormGroup;

	constructor(
		private session: SessionService
	) { }

	ngOnInit() {
		// set up form
		this.regform = this.session.getRegistrationForm();
		// set up data binding
		this._formSubscriber = this.session.currentRegistrationForm.subscribe(
			loginForm => {
				this.regform.setValue(loginForm.value);
			}
		)
	}

	ngOnDestroy() {
		this._formSubscriber.unsubscribe();
	}

	changeInput(event: any) {
		this.session.updateRegistrationForm(this.regform);
	}

	login(event) {
		// update all fields
		Object.keys( this.regform.controls ).forEach( key => {
			let control = this.regform.get(key);
			control.markAsTouched({onlySelf:true});
		});
		// submit if valid
		if( this.regform.valid ) {
			this.session.login();
		}
	}

	// @HostListener('window:resize', ['$event'])
	// onResize(event) {
	// 	// background image: 2500x1629
	// 	let ratio = 1629 / 2500;
	// 	let width = event.target.innerWidth;
	// 	let height = width * ratio;
	// 	document.querySelector('mat-card#form').style.height = height+'px';
	// }
}
