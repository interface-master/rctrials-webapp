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

	// private showSpinner: boolean = true;
	private route: String = "home";

	constructor(
		private router: Router,
		private session: SessionService,
		private spinner: SpinnerService,
	) {
		// observe route changes for background images
		router.events.subscribe((val) => {
			if( val instanceof NavigationEnd ) {
				this.route = val.url.split('/')[1];
			}
		});
		// observe view loads to disable spinner ?
		// instead of ngDoCheck ???
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
		// check session by validating user
		// returns user or null if no cookies are set
		// this.session.getUser().then( (user:any) => {
		// 	console.log('app.component:user:',user);
		// 	this.spinner.hide('main');
		// });
	}

	ngDoCheck() {
		this.spinner.hide('main');
	}

}
