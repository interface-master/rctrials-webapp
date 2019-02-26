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

	constructor(
		private router: Router,
		private session: SessionService,
	) {
		const self = this;
		// close menu when routing
		router.events.subscribe((val) => {
			if( val instanceof NavigationEnd ) {
				self.closeMenu();
			}
		});
		// hide/show menu items when logged in
		session.currentUserInfo.subscribe(
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

	toggleState() {
		this._menu = !this._menu;
	}

	closeMenu() {
		this._menu = false;
	}

}
