import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	private isLoggedIn: boolean = false;

	constructor(private session: SessionService) {
	}

	ngOnInit() {
		this.session.currentUserInfo.subscribe(
			userInfo => {
				this.isLoggedIn = ( userInfo.uid ) ? true : false;
			}
		)
		console.log('session:',this.session);
	}



}
