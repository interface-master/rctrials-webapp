import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { DialogModalComponent } from '../components/dialog-modal/dialog-modal.component';

/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable({
	providedIn: 'root',
})
export class DialogService {

	constructor(
		public dialog: MatDialog,
	) { }

	// TODO: use this to open dialogs
	// refactor existing use of DialogModalComponent
	open(title:string, text:string): Observable<any> {
		const ack = this.dialog.open( DialogModalComponent, {
			data: {
				title,
				text,
				buttons: {
					n: 1
				}
			},
			width: '350px;'
		});
		return ack.afterClosed();
	}

  image(image:string): Observable<any> {
    const ack = this.dialog.open( DialogModalComponent, {
      data: {
        image,
        buttons: {
          n: 1
        }
      },
      width: '100%;'
    });
    return ack.afterClosed();
  }

	/**
	 * Ask user to confirm an action. `message` explains the action and choices.
	 * Returns observable resolving to `true`=confirm or `false`=cancel
	 */
	confirm(title:string, text:string): Observable<any> {
		const ack = this.dialog.open( DialogModalComponent, {
			data: {
				title,
				text,
				buttons: {
					n: 2
				},
			},
			width: '350px;'
		});
		return ack.afterClosed();
	};
}
