import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from "../../services/session.service";

@Component({
	selector: 'logout',
	templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

	constructor(
		private router: Router,
		private sessionService: SessionService,
	) { }

	ngOnInit() {
		this.sessionService.logout();
		this.router.navigateByUrl('/home');
	}

}
