import { Component } from '@angular/core';

import { Subscription } from 'rxjs';

import { DialogService } from '../../services/dialog.service';

@Component({
	selector: 'doc-developers',
	templateUrl: './doc.developers.component.html',
	styleUrls: ['./documentation.component.scss']
})
export class DocDevelopersComponent {
	constructor(
		private dialog: DialogService
	) {}

	imagePopup(event) {
		console.log('popup');
		if(event.preventDefault) event.preventDefault();
		const ret:Subscription = this.dialog.image( '/assets/img/docs/postman_collection.gif' )
		.subscribe( val => {
			ret.unsubscribe();
		});
	}
}
