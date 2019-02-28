import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionService } from "../../services/session.service";

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
	private _menu:boolean = false;
	private _signedIn:boolean = false;
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
					self._signedIn = true;
				} else {
					self._signedIn = false;
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
		this._menu = !this._menu;
	}

	closeMenu() {
		this._menu = false;
	}

}
