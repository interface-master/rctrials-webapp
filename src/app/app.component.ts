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
				this.route = val.url.split('/')[1];
			}
		});
	}

	ngOnInit() {
		// view stuff
		if( window.document.querySelector('.mrct-wrapper').clientHeight < window.screen.height ) {
			// content is smaller than screen - make it float?
		}
		// preload images
		let imgs = [
			'/assets/img/chuttersnap-348302-unsplash.jpg',
			'/assets/img/martin-adams-1062002-unsplash.jpg',
			'/assets/img/janko-ferlic-174927-unsplash.jpg',
			'/assets/img/adult-analysis-banking-1549000.jpg',
			'/assets/img/accounting-alone-application-938965.jpg',
			'/assets/img/abstract-black-and-white-blur-261763.jpg',
		];
		for( let i = 0; i < imgs.length; i++ ) {
			let x = new Image();
			x.src = imgs[i];
		}
		// check session info
		this.sessionService.validateUserSession().then( (user: any) => {
			if( user.uid ) {
				// TODO: set user details here from
				// console.log('%cvalidated user session','color:purple',user);
				// console.log("%cROUTE:",'color:purple',this.router.url);
				if( this.router.url == '/home' ) {
					this.router.navigateByUrl('/dashboard');
				}
			} else {
				if( location.pathname !== '/about'
						&& location.pathname !== '/register'
						&& location.pathname !== '/login'
						&& location.pathname !== '/logout'
						&& location.pathname !== '/privacy'
						&& location.pathname !== '/terms'
						&& location.pathname.split('/')[1] !== 'docs'
					) {
						this.router.navigateByUrl('/home');
					}
			}
			this.spinnerService.hide('main');
		});
	}

	ngAfterViewInit() {
		this.spinnerService.show('main');
	}

}
