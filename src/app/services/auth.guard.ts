import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { SessionService } from "./session.service";

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private session: SessionService
	) { }

	async canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		console.log('AuthGuard#canActivate called',state.url);
		// let isLoggedIn = await this.session.isLoggedIn();
		console.log("session:",this.session);
		console.log("isLoggedIn:",this.session.isLoggedIn());
		//
		if( this.session.isLoggedIn() ) {
			return true;
		} else {
			const user = await this.session.getUser();
			console.log("got user:",user);
			if( user && user.uid ) {
				return true;
			}
			this.session.setRedirectURL( state.url );
			this.router.navigate(['/login']);
			return false;
		}
		/*
		this.session.currentUserInfo.subscribe(
			userInfo => {
				console.log("came back with",userInfo);
				if( userInfo.uid ) {
					return true;
				} else {
					this.session.setRedirectURL( state.url );
					this.router.navigate(['/login']);
					return false;
				}
			}
		);
		*/
	}
}
