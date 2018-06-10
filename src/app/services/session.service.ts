import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';

import axios from 'axios';
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';


@Injectable()
export class SessionService {

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
	currentRegistrationForm = this.registrationForm.asObservable();

	private userInfo = new BehaviorSubject( this.USER );
	currentUserInfo = this.userInfo.asObservable();


	/**
	 * updates registration form fields
	 */
	updateRegistrationForm(formData: FormGroup) {
		formData.controls.hash.setValue( this.generateHash() );
		this.registrationForm.next(formData);
	}

	/**
	 * updates user info
	 */
	updateUserInfo(userInfo: User) {
		this.userInfo.next(userInfo)
	}


	/**
	 *
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
			form.controls.salt.setValue( response.data.salt );
			form.controls.hash.setValue( this.generateHash() );
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
			.then( (response) => {
				this.userInfo.next({
					uid: response.data.id,
					email: form.value.email,
					name: response.data.name,
					role: response.data.role,
					access_token: response.data.access_token,
					refresh_token: response.data.refresh_token
				});
			})
			.catch( (error) => {
				console.warn(error);
			});
		}
		// validate
		if( this.userInfo.value.uid ) {
			// logged in
			this.saveCookie( 'access_token', this.userInfo.value.access_token );
			this.saveCookie( 'refresh_token', this.userInfo.value.refresh_token );
			console.log( this.parseCookie( 'access_token' ) );
			console.log("%cdestructured:","color:purple",this.userInfo.value)
		} else {
			// error
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
			+ date.toGMTString() +
			+ '; path=/';
	}

	/**
	 * Parses cookies with an "mrct_" prefix and returns the value
	 */
	parseCookie(key: string) {
		let ary = [];
		window.document.cookie.split(';').map( i => {
			let k = i.split('=')[0].trim();
			let v = i.split('=')[1].trim();
			ary[k] = v;
		} );
		return ary['mrct_'+key];
	}


	constructor() {
		// console.log('session service:',this);
	}

}
