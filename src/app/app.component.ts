import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionService } from "./services/session.service";
import { SpinnerService } from "./services/spinner.service";


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	route: String = "home";
	private _routeSubscriber:any;

	constructor(
		private router: Router,
		private session: SessionService,
		private spinner: SpinnerService,
	) {
		// observe route changes for background images
		this._routeSubscriber = router.events.subscribe((val) => {
			if( val instanceof NavigationEnd ) {
				// store route to toggle background images in the html
				this.route = val.url
						.split('#').shift()
						.split('/').pop();
				console.log('route is now',this.route);
				// Google Analytics tracking
				(<any>window).ga('set', 'page', val.urlAfterRedirects);
				(<any>window).ga('send', 'pageview');
			}
		});
		// observe view loads to disable spinner ?
		// instead of ngDoCheck ???
	}

	ngOnInit() {
		// view stuff
		if( window.document.querySelector('.rct-wrapper').clientHeight < window.screen.height ) {
			// content is smaller than screen - make it float?
		}
		// preload images // TODO: for some reason still seeing background images flicker
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
	}

	ngDoCheck() {
		this.spinner.hide('main');
	}

	ngOnDestroy() {
		this._routeSubscriber.unsubscribe();
	}

}
