import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	CanDeactivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Router } from '@angular/router';

import { AdminNewTrialComponent } from '../components/admin-new-trial/admin-new-trial.component';
import { DialogService } from './dialog.service';

@Injectable({
	providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<AdminNewTrialComponent> {
	constructor(
		public dialog: DialogService,
		private router: Router
	) { }

	canDeactivate(
		component: AdminNewTrialComponent,
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):Observable<boolean> | boolean {
		if( component.formsTouched ) {
			return this.dialog.confirm(
				"Discard Changes?",
				"There are unsaved changes in the form, are you sure you wish to discard them?"
			);
		}
		return true;
	}
}
