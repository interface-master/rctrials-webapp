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
		this.sessionService.validateUserSession().then( (user: any) => {
			this.spinnerService.hide('main');
			if( user.uid ) {
				// TODO: set user details here from
				console.log('%cvalidated user session','color:purple',user);
				console.log("%cROUTE:",'color:purple',this.router.url);
				if( this.router.url == '/home' ) {
					this.router.navigateByUrl('/dashboard');
				}
			} else {
				console.log('invalid user session',user);
				this.router.navigateByUrl('/home');
			}
		});
	}

}
