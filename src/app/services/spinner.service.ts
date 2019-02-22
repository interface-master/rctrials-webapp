import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable()
export class SpinnerService {

	private spinnerCache = new Set<SpinnerComponent>();

	_register( spinner: SpinnerComponent ): void {
		// console.log('%cregistering','color:green',spinner)
		this.spinnerCache.add(spinner);
	}

	show( spinnerName: string ): void {
		this.spinnerCache.forEach(spinner => {
			if ( spinner.name === spinnerName ) {
				// console.log("%cshowing spinner","color:green",spinnerName);
				spinner.show = true;
			}
		});
	}

	hide( spinnerName: string ): void {
		this.spinnerCache.forEach( spinner => {
			if ( spinner.name === spinnerName ) {
				// console.log('%chiding spinner',"color:green",spinnerName);
				spinner.show = false;
			}
		});
	}

}
