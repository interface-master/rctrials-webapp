import { Component, OnInit } from '@angular/core';

import { SessionService } from "../../services/session.service";


@Component({
	selector: 'about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
