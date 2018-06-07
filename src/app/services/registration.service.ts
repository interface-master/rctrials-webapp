import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

// import { LoginForm } from '../models/login-form.model';

import md5 from 'crypto-js/md5';


@Injectable()
export class RegistrationService {

	// REGISTRATION_FORM: LoginForm = new LoginForm(
	// 	'.',
	// 	'.',
	// 	md5( new Date().getTime().toString() ).toString(),
	// 	'.'
	// );
	REGISTRATION_FORM: FormGroup = new FormGroup({
		email: new FormControl(''),
		pass: new FormControl('')
	});


	private registrationForm = new BehaviorSubject(this.REGISTRATION_FORM);
	// private registration = this.REGISTRATION_FORM;
	currentRegistrationForm = this.registrationForm.asObservable();

	updateRegistrationForm(formData: FormGroup) {
		console.log('got form',formData)
		this.registrationForm.next(formData)
	}

	// private upersons = UserData;

	// getUsersFromData(): User[] {
	// 	return this.upersons;
	// }
	//
	// addUser(user: User, maxMem) {
	// 	let id = 1;
	// 	user.id = id++;
	// 	if (this.upersons.length < maxMem) {
	// 		this.upersons.push(user);
	// 	}
	// 	else{
	// 		alert("Too many Suppliment member Added");
	// 	}
	// }

	//
	// updateUser(user: User) {
	// 	let index = findIndex(this.upersons, (u: User) => {
	// 		return u.id === user.id;
	// 	})
	// 	//alert(index);
	// 	this.upersons[index] = user;
	// }
	// deleteUser(user: User) {
	// 	//alert("deleteUser");
	// 	this.upersons.splice(this.upersons.indexOf(user), 1);
	//
	// }

	constructor() { }

}
