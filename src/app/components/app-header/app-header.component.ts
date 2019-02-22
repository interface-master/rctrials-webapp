import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
	private _menu:boolean = false;

	constructor(
		private router: Router
	) {
		const self = this;
		router.events.subscribe((val) => {
			if( val instanceof NavigationEnd ) {
				self.closeMenu();
			}
		});
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
