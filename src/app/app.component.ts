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
		const data = {
			email: this.email,
			pass: this.pass,
			name: this.name,
			role: this.role,
			salt: this.salt,
			hash: this.hash,
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

	async login(event) {
		let data = {
			client_id: 'mrct',
			client_secret: 'doascience',
			scope: 'basic',
			grant_type: 'password',
			username: this.email,
			salt: undefined,
			hash: undefined,
			id: undefined,
			name: undefined,
			role: undefined
		}
		// fetch the salt
		const dataEmail = {
			username: data.username
		};
		await axios.post('http://localhost/validate/email', dataEmail )
		.then( (response) => {
			data.salt = response.data.salt;
			data.hash = sha256( this.pass + data.salt ).toString();
		})
		.catch( (error) => {
			console.warn(error);
		});
		// fetch login
		if( data.salt && data.hash ) {
			const dataLogin = {
				client_id: data.client_id,
				client_secret: data.client_secret,
				scope: data.scope,
				grant_type: data.grant_type,
				username: data.username,
				password: data.hash
			};
			await axios.post('http://localhost/validate/login', dataLogin)
			.then( (response) => {
				data.id = response.data.id;
				data.name = response.data.name;
				data.role = response.data.role;
			})
			.catch( (error) => {
				console.warn(error);
			});
		}
		// validate
		if( data.id ) {
			// logged in
			const user = {
				id: data.id,
				name: data.name,
				email: data.username,
				role: data.role
			}
			console.log("%cSUCCESS!","color:green;",data)
			console.log("%cdestructured:","color:purple",user)
		} else {
			// error
			console.log("%cFAIL!","color:red;",data)
		}
	}

}
