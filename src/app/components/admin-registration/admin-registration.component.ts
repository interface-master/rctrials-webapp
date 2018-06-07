import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RegistrationService } from "../../services/registration.service";

import axios from 'axios';
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';


@Component({
	selector: 'admin-registration',
	templateUrl: './admin-registration.component.html',
	styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent implements OnInit {
	private title:string = 'Researcher Registration';
	private name:string = '';
	private role:string = 'admin';
	private salt:string = md5( new Date().getTime().toString() ).toString();
	private hash:string = '';

	regform: FormGroup;

	// email: string = '';
	// @Output() dataEvent = new EventEmitter<string>();

	// sendData() {
	// 	this.dataEvent.emit( this.email );
	// }

	constructor(private reg: RegistrationService) {
	}

	ngOnInit() {
		// set up the form
		this.regform = new FormGroup({
			email: new FormControl(''),
			pass: new FormControl(''),
			// salt: new FormControl(''),
			// hash: new FormControl('')
		});
		// set up data binding
		this.reg.currentRegistrationForm.subscribe(
			loginForm => {
				console.log('reg got data:',loginForm);
				this.regform.setValue(loginForm.value);
			}
		)
	}

	changeInput(event: any) {
		this.reg.updateRegistrationForm(this.regform)
	}

	updateHash(event) {
		this.regform.value.pass = event.target.value;
		this.regform.value.hash = sha256( this.regform.value.pass + this.regform.value.salt ).toString();
	}

	register(event) {
		const data = {
			email: this.regform.value.email,
			pass: this.regform.value.pass,
			// name: this.regform.value.name,
			// role: this.regform.value.role,
			salt: this.regform.value.salt,
			hash: this.regform.value.hash,
		};
		console.log("Registering...",data);
		axios.post('http://localhost/register', data)
		.then( (response) => {
			console.log(response);
		})
		.catch( (error) => {
			console.warn(error);
		});
	}


}
