import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from "./services/session.service";
import { SpinnerService } from "./services/spinner.service";


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	private loading: boolean = true;

	constructor(
		private router: Router,
		private sessionService: SessionService,
		private spinnerService: SpinnerService,
	) { }

	ngOnInit() {
		// validate user session
		this.sessionService.validateUserSession().then( ret => {
			console.log('validated user session',ret);
			this.spinnerService.hide('main');
			if( ret.uid ) {
				// acquired user id from details, goto dashboard
				this.router.navigateByUrl('/dashboard');
			}
		});
	}

}
