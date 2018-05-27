import { Component } from '@angular/core';
import axios from 'axios';
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'MRCT';

	email = '';
	pass = '';
	name = '';
	role = 'admin';
	salt = md5( new Date().getTime().toString() ).toString();
	hash = '';

	constructor() {
	}

	updateHash(event) {
		this.pass = event.target.value;
		this.hash = sha256( this.pass + this.salt ).toString();
	}

	register(event) {
		let data = {
			email: this.email,
			pass: this.pass,
			name: this.name,
			role: this.role,
			salt: this.salt,
			hash: this.hash,
		};
		console.log("Registering...",data);
		axios.post('http://localhost/register', data)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

}
