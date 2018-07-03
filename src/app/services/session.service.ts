import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import axios from 'axios';
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';

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

	private rnd = md5( new Date().getTime().toString() ).toString();

	REGISTRATION_FORM: FormGroup = new FormGroup({
		email: new FormControl(''),
		pass: new FormControl(''),
		salt: new FormControl(this.rnd),
		hash: new FormControl('')
	});

	USER: User = new User();


	private registrationForm = new BehaviorSubject( this.REGISTRATION_FORM );
	public getRegistrationForm = () => this.registrationForm.getValue();
	currentRegistrationForm = this.registrationForm.asObservable();

	private userInfo = new BehaviorSubject( this.USER );
	currentUserInfo = this.userInfo.asObservable();


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
		formData.controls.hash.setValue( this.generateHash() );
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
			salt: form.value.salt,
			hash: form.value.hash,
			email: form.value.email,
			pass: form.value.pass, // TODO: do not save this
			name: user.name,
			role: user.role
		}
		axios.post('http://localhost/register', data) // TODO: remove hard-coded URLs into a serivce
		.then( (response) => {
			// TODO
			// you've successfully registered
			// now you need to receive an email with a token
			// validate your email by visiting a link
			// then you can log in once the account is marked as active
			// /TODO


			// if there's an error during registration
			if( response.data.status !== 200 ) {
				let message = response.data.message || "No error message was specified.";
				this.openDialog( "Registration Failed", message );
			}
			// otherwise, all is well
			else {
				console.log( "%cRegistration Successful", "color:green", response.data.id );
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
			console.log(response);
		})
		.catch( (error) => {
			console.warn(error);
		});
	}

	/**
	 * attempts to log in and get access and refresh tokens
	 * first sends email to get salt
	 * then uses salt to hash password
	 * then sends email and hash to get tokens
	 */
	async login() {
		const form = this.registrationForm.value;
		// fetch the salt
		const dataEmail = {
			username: form.value.email
		};
		await axios.post('http://localhost/validate/email', dataEmail ) // TODO: remove hard-coded URLs into a serivce
		.then( (response) => {
			if( response.data.salt ) {
				form.controls.salt.setValue( response.data.salt );
				form.controls.hash.setValue( this.generateHash() );
			}
		})
		.catch( (error) => {
			console.warn(error);
		});
		// fetch login
		if( form.value.salt && form.value.hash ) {
			const dataLogin = Object.assign(
				{},
				this.API_CREDENTIALS,
				{
					username: form.value.email,
					password: form.value.hash
				}
			);
			await axios.post('http://localhost/validate/login', dataLogin) // TODO: remove hard-coded URLs into a serivce
			.then( async (response) => {
				this.saveCookie( 'access_token', response.data.access_token );
				this.saveCookie( 'refresh_token', response.data.refresh_token );
				const user = await this.fetchUserDetails();
				this.userInfo.next(user);
			})
			.catch( (error) => {
				console.warn(error);
			});
		}
		// console.log('session service . login . user:',this.userInfo.value,this.currentUserInfo.source.value);
		// validate
		if( this.userInfo.value.access_token ) {
			// logged in
			this.saveCookie( 'access_token', this.userInfo.value.access_token );
			this.saveCookie( 'refresh_token', this.userInfo.value.refresh_token );
			console.log( this.parseCookie( 'access_token' ) );
			console.log("%cdestructured:","color:purple",this.userInfo.value)
			this.router.navigateByUrl('/dashboard');
		} else {
			// error
			this.openDialog("Login Failed","Hmm. Are you sure you have the right username and password?");
			form.controls.salt.setValue( this.rnd );
			console.log("%cFAIL!","color:red;",this)
		}
	}


	/**
	 * generates a hash out of password and salt
	 */
	generateHash() {
		const pass = this.registrationForm.value.value.pass;
		const salt = this.registrationForm.value.value.salt;
		let hash = sha256(pass+salt).toString();
		return hash;
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


	openDialog(title: string, text: string): void {
		let dialogRef = this.dialog.open( DialogModalComponent, {
			width: '350px',
			data: { title, text }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			// this.dataFromDialog = result;
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
		return axios.get('http://localhost/user/details', header ) // TODO: remove hard-coded URLs into a serivce
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
		return axios.post('http://localhost/validate/login', header) // TODO: remove hard-coded URLs into a serivce
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

	/**
	 * When initializing validate if cookies have valid session tokens
	 * If so, log in
	 */
	constructor(
		private router: Router,
		public dialog: MatDialog,
	) { }

}
