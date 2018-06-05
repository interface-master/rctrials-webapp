import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private title = 'MRCT';

	constructor() {
		console.log("HOME CONSTRUCT");
	}

	ngOnInit() {
		console.log("HOME INIT");
	}

}
