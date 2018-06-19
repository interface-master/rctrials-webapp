import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

	constructor(
		private session: SessionService,
		private router: Router
	) { }

	ngOnInit() {
		this.session.currentUserInfo.subscribe(
			userInfo => {
				console.log("admin dashboard current user:", userInfo);
				if( !userInfo.uid ) {
				}
			}
		)

		// if( !this.session.currentUserInfo.source.value().uid ) {
		// 	this.router.navigateByUrl('/home');
		// }
	}

}
