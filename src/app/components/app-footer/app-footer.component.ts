import { Component, OnInit } from '@angular/core';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'app-footer',
	templateUrl: './app-footer.component.html',
	styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

	constructor(
		private session: SessionService
	) { }

	ngOnInit() {
	}

}
