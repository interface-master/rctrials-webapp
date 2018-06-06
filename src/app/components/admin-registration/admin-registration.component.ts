import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
	private email:string = '';
	private pass:string = '';
	private name:string = '';
	private role:string = 'admin';
	private salt:string = md5( new Date().getTime().toString() ).toString();
	private hash:string = '';

	// email: string = '';
	// @Output() dataEvent = new EventEmitter<string>();

	// sendData() {
	// 	this.dataEvent.emit( this.email );
	// }

	constructor() {
	}

	ngOnInit() {
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


}
