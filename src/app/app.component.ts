import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionService } from "./services/session.service";
import { SpinnerService } from "./services/spinner.service";


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

	private showSpinner: boolean = true;
	private route: String = "home";

	constructor(
		private router: Router,
		private sessionService: SessionService,
		private spinnerService: SpinnerService,
	) {
		router.events.subscribe((val) => {
			if( val instanceof NavigationEnd ) {
				this.route = val.url.replace(/\//g,'');
			}
		});
	}

	ngOnInit() {
		console.log("HERE")
		// preload images
		let imgs = [
			'chuttersnap-348302-unsplash.jpg',
			'martin-adams-1062002-unsplash.jpg',
			'janko-ferlic-174927-unsplash.jpg',
		];
		for( let i = 0; i < imgs.length; i++ ) {
			let x = new Image();
			x.src = imgs[i];
		}
		// check session info
		this.sessionService.validateUserSession().then( (user: any) => {
			if( user.uid ) {
				// TODO: set user details here from
				console.log('%cvalidated user session','color:purple',user);
				console.log("%cROUTE:",'color:purple',this.router.url);
				if( this.router.url == '/home' ) {
					this.router.navigateByUrl('/dashboard');
				}
			} else {
				console.log('response:',user);
				console.log('this.router',this.router);
				if( location.pathname !== '/about'
						&& location.pathname !== '/docs'
						&& location.pathname !== '/register'
						&& location.pathname !== '/login'
					) {
						console.log('invalid user session',user);
						this.router.navigateByUrl('/home');
					}
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
