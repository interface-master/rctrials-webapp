import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import axios from 'axios';

import { ApiService } from './api.service';
import { User } from '../models/user.model';

import { DialogModalComponent } from '../components/dialog-modal/dialog-modal.component';

@Injectable()
export class SessionService {

	private BLANK = {
		uid: null,
		email: null,
		name: null,
		role: null,
		access_token: null,
		refresh_token: null
	};

	private API_CREDENTIALS = {
		client_id: 'mrct',
		client_secret: 'doascience',
		scope: 'basic',
		grant_type: 'password',
	}

	REGISTRATION_FORM: FormGroup = new FormGroup({
		email: new FormControl('',Validators.compose([
			Validators.required,
			Validators.pattern('^^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
		])),
		pass: new FormControl('',Validators.required)
	});

	USER: User = new User();


	private registrationForm = new BehaviorSubject( this.REGISTRATION_FORM );
	public getRegistrationForm = () => this.registrationForm.getValue();
	currentRegistrationForm = this.registrationForm.asObservable();

	private userInfo = new BehaviorSubject( this.USER );
	currentUserInfo = this.userInfo.asObservable();


	/**
	 */
	constructor(
		private api: ApiService,
		private router: Router,
		public dialog: MatDialog,
	) { }


	/**
	* updates user info
	*/
	updateUserInfo(userInfo: User) {
		this.userInfo.next( userInfo )
	}

	/**
	 * updates registration form fields
	 */
	updateRegistrationForm(formData: FormGroup) {
		this.registrationForm.next( formData );
	}


	/**
	 * handles sending registration info to the API
	 * // TODO: should return something?
	 */
	async register() {
		const form = this.registrationForm.value;
		const user = this.userInfo.value;
		const data = {
			email: form.value.email,
			pass: form.value.pass,
			name: user.name
		}
		axios.post( this.api.register, data )
		.then( (response) => {
			// TODO
			// you've successfully registered
			// now you need to receive an email with a token
			// validate your email by visiting a link
			// then you can log in once the account is marked as active
			// /TODO

			// if there's an error during registration
			if( response.data.error ) {
				let message = response.data.error || "No error message was specified.";
				this.openDialog( "Registration Failed", message );
			}
			// otherwise, all is well
			else {
				// TODO: fix this:
				// console.log( "%cRegistration Successful", "color:green", response.data.id );
				this.openDialog( "Registration Successful", `Your account has been created. Please note down your ID: ${response.data.id}\nJust kidding. We'll send you an email to validate your account. Once you've confirmed your email, you can log in and create your trials.` );
			}

			// this.userInfo.next({
			// 	uid: response.data.id,
			// 	email: form.value.email,
			// 	name: user.name,
			// 	role: user.role,
			// 	access_token: '?',
			// 	refresh_token: '?'
			// });
		})
		.catch( (error) => {
			let title = "Registration Failed";
			let message = "No error message was specified.";
			if (error.response) {
				title += ` (${error.response.status})`;
				message = error.response.data.error;
			// } else if (error.request) {
			// 	message = error.request;
			} else {
				message = error.message || message;
			}
			this.openDialog( title, message );
		});
	}

	/**
	 * attempts to log in and get access and refresh tokens
	 * sends email and password
	 * to be salted and hashed on the server
	 */
	async login() {
		const form = this.registrationForm.value;
		// fetch login
		const dataLogin = Object.assign(
			{},
			this.API_CREDENTIALS,
			{
				username: form.value.email,
				password: form.value.pass
			}
		);
		await axios.post( this.api.login, dataLogin )
		.then( async (response) => {
			this.saveCookie( 'access_token', response.data.access_token );
			this.saveCookie( 'refresh_token', response.data.refresh_token );
			const user = await this.fetchUserDetails();
			this.userInfo.next(user);
		})
		.catch( (error) => {
			console.warn(error);
		});
		// console.log('session service . login . user:',this.userInfo.value,this.currentUserInfo.source.value);
		// validate
		if( this.userInfo.value.access_token ) {
			// logged in
			this.saveCookie( 'access_token', this.userInfo.value.access_token );
			this.saveCookie( 'refresh_token', this.userInfo.value.refresh_token );
			this.router.navigateByUrl('/dashboard');
		} else {
			// error
			this.openDialog("Login Failed","Hmm. Are you sure you have the right username and password?");
		}
	}

	logout() {
		this.removeCookie('access_token');
		this.removeCookie('refresh_token');
		this.userInfo.next(this.BLANK);
	}

	/**
	 * Sets cookies with an "mrct_" prefix to expire in 24 hours
	 */
	saveCookie(key: string, value: string) {
		var date = new Date();
		date.setTime( date.getTime() + (24*60*60*1000) );
		window.document.cookie = 'mrct_'+key
			+ '=' + value
			+ '; expires='
			+ date.toUTCString() +
			+ '; path=/';
	}

	/**
	 * Parses cookies with an "mrct_" prefix and returns the value
	 */
	parseCookie(key: string) {
		let ary = [];
		ary['mrct_'+key] = null;
		window.document.cookie.split(';').map( i => {
			try {
				let k = i.split('=')[0].trim();
				let v = i.split('=')[1].trim();
				if(k) ary[k] = v;
			} catch(err) {}
		} );
		return ary['mrct_'+key];
	}

	/**
	 * Removes a cookie with the prefix
	 */
	removeCookie(key: string) {
		var date = new Date();
		date.setTime( date.getTime() - (24*60*60*1000) );
		window.document.cookie = 'mrct_'+key
			+ '=' + ' '
			+ '; expires='
			+ date.toUTCString() +
			+ '; path=/';
	}

	openDialog(title: string, text: string): void {
		let dialogRef = this.dialog.open( DialogModalComponent, {
			width: '350px',
			data: { title, text }
		});

		dialogRef.afterClosed().subscribe(result => {
			// dialog is closed
		});
	}


	async fetchUserDetails() {
		const access_token = this.parseCookie('access_token');
		const refresh_token = this.parseCookie('refresh_token');
		const header: any = {
			headers: {
				'Authorization' : `Bearer ${access_token}`
			}
		};
		return axios.get( this.api.userDetails, header )
		.then( (response) => {
			// got user
			if( response.data.uid ) {
				return {
					uid: response.data.uid,
					email: response.data.email,
					name: response.data.name,
					role: response.data.role,
					access_token,
					refresh_token
				}
			} else {
				throw new Error('urr: no user details');
			}
		})
		.catch( async (error) => {
			if( error.response ) {
				switch( error.response.status ) {
					case 401: // unauthorized
						// if access token didn't work, try refresh token
						let retVal = await this.tryRefreshToken();
						if( retVal ) {
							return this.fetchUserDetails();
						}

					default:
						console.warn("%cfetchUserDetails Error:","color:red",error);
						break;
				}
			}
			return this.BLANK;
		});
	}

	async tryRefreshToken() {
		const refresh_token = this.parseCookie('refresh_token');
		const header: any = Object.assign(
			{},
			this.API_CREDENTIALS,
			{
				grant_type: 'refresh_token',
				refresh_token
			}
		);
		return axios.post( this.api.login, header)
		.then( (response) => {
			this.saveCookie( 'access_token', response.data.access_token );
			this.saveCookie( 'refresh_token', response.data.refresh_token );
			return {
				access_token: response.data.access_token,
				refresh_token: response.data.refresh_token
			};
		})
		.catch( (error) => {
			console.warn("tryRefreshToken Error:",error);
			return null;
		});
	}



	/**
	 * Check cookies to see if an access/refresh token exists
	 * If so, use it to retrieve user info
	 */
	async validateUserSession() {
		// return await new Promise( (resolve) => {
		const access_token = this.parseCookie('access_token');
		if( access_token ) {
			const user: any = await this.fetchUserDetails();
			this.updateUserInfo(user);
			return user;
		}
		else {
			// await new Promise( r => setTimeout( r, 2000 ) );
			return this.BLANK;
		}
	}

}
