import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private _state:string = 'login';

	constructor(
		private session: SessionService
	) { }

	ngOnInit() {
	}

	toggleState() {
		this._state = (this._state=='login') ? 'register' : 'login';
	}

}
