import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionService } from "../../services/session.service";

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
	public menu:boolean = false;
	public signedIn:boolean = false;
	private _routeSubscriber:any;
	private _userSubscriber:any;

	constructor(
		private router: Router,
		private session: SessionService,
	) {
		const self = this;
		// close menu when routing
		this._routeSubscriber = router.events.subscribe((val) => {
			if( val instanceof NavigationEnd ) {
				self.closeMenu();
			}
		});
		// hide/show menu items when logged in
		this._userSubscriber = session.currentUserInfo.subscribe(
			userInfo => {
				if( userInfo.uid ) {
					self.signedIn = true;
				} else {
					self.signedIn = false;
				}
			}
		);
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this._routeSubscriber.unsubscribe();
		this._userSubscriber.unsubscribe();
	}

	toggleState() {
		this.menu = !this.menu;
	}

	closeMenu() {
		this.menu = false;
	}

}
