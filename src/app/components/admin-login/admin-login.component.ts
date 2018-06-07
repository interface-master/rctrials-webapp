import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RegistrationService } from "../../services/registration.service";

import axios from 'axios';
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';


@Component({
	selector: 'admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
	private title:string = 'Researcher Login';

	private uid:string = null;
	private name:string = '';
	private role:string = '';
	private access_token:string = '';
	private refresh_token:string = '';

	private API_CREDENTIALS = {
		client_id: 'mrct',
		client_secret: 'doascience',
		scope: 'basic',
		grant_type: 'password',
	}

	regform: FormGroup;

	constructor(private reg: RegistrationService) {
	}

	ngOnInit() {
		// set up form
		this.regform = new FormGroup({
			email: new FormControl(''),
			pass: new FormControl('')
		});
		// set up data binding
		this.reg.currentRegistrationForm.subscribe(
			loginForm => {
				console.log('login got data:',loginForm);
				this.regform.setValue(loginForm.value);
			}
		)
	}

	changeInput(event: any) {
		this.reg.updateRegistrationForm(this.regform)
	}

/*
	async login(event) {
		//
		// let data = {
		// 	username: this.email,
		// 	salt: undefined,
		// 	hash: undefined,
		// 	id: undefined,
		// 	name: undefined,
		// 	role: undefined
		// }
		// fetch the salt
		const dataEmail = {
			username: this.email
		};
		await axios.post('http://localhost/validate/email', dataEmail )
		.then( (response) => {
			this.salt = response.data.salt;
			this.hash = sha256( this.pass + this.salt ).toString();
		})
		.catch( (error) => {
			console.warn(error);
		});
		// fetch login
		if( this.salt && this.hash ) {
			const dataLogin = {
				client_id: this.API_CREDENTIALS.client_id,
				client_secret: this.API_CREDENTIALS.client_secret,
				scope: this.API_CREDENTIALS.scope,
				grant_type: this.API_CREDENTIALS.grant_type,
				username: this.email,
				password: this.hash
			};
			await axios.post('http://localhost/validate/login', dataLogin)
			.then( (response) => {
				this.uid = response.data.id;
				this.name = response.data.name;
				this.role = response.data.role;
				this.access_token = response.data.access_token;
				this.refresh_token = response.data.refresh_token;
			})
			.catch( (error) => {
				console.warn(error);
			});
		}
		// validate
		if( this.uid ) {
			// logged in
			const user = {
				id: this.uid,
				name: this.name,
				email: this.email,
				role: this.role,
				access_token: this.access_token,
				refresh_token: this.refresh_token,
			}
			console.log("%cdestructured:","color:purple",user)
		} else {
			// error
			console.log("%cFAIL!","color:red;",this)
		}
	}
*/

}
