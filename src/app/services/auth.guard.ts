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
	) {
		console.log("auth.guard.isLoggedIn:",this.session.isLoggedIn());
		console.log("auth.guard.isValidating:",this.session.isValidating());
		// are we logged in?
		if( this.session.isLoggedIn() ) {
			return true;
		} else {
			// do we maybe have an expired session?
			const user = await this.session.getUser();
			if( user && user.uid ) {
				return true;
			}
			// we should log in then
			this.session.setRedirectURL( state.url );
			this.router.navigate(['/login']);
			return false;
		}
	}
}
