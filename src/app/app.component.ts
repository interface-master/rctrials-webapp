import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from "./services/session.service";
import { SpinnerService } from "./services/spinner.service";


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	private showSpinner: boolean = true;

	constructor(
		private router: Router,
		private sessionService: SessionService,
		private spinnerService: SpinnerService,
	) { }

	ngOnInit() {
		console.log("HERE")
		this.sessionService.validateUserSession().then( (user: any) => {
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
			console.log('finished with spinner:')
			this.spinnerService.hide('main');
			console.log('spinner service:',this.spinnerService);
		});
	}

	ngAfterViewInit() {
		console.log("THERE")
		this.spinnerService.show('main');
	}

}
