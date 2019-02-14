import { Component, OnInit } from '@angular/core';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

	constructor(
		private session: SessionService
	) { }

	ngOnInit() {
	}

}
