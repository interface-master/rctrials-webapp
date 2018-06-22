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

	constructor(
		private router: Router,
		private sessionService: SessionService,
		private spinnerService: SpinnerService,
	) { }

	ngOnInit() {
		this.sessionService.validateUserSession().then( ret => {
			this.spinnerService.hide('main');
			if( ret.uid ) {
				console.log('validated user session',ret);
				this.router.navigateByUrl('/dashboard');
			} else {
				console.log('invalid user session',ret);
				this.router.navigateByUrl('/home');
			}
		});
	}

}
