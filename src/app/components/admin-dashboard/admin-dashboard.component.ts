import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Trial } from '../../models/trial.model';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';

import axios from 'axios';

@Component({
	selector: 'admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
	private trials:Trial[];
	private _userSubscriber:any;

	constructor(
		private api: ApiService,
		private session: SessionService,
		private router: Router
	) {
		this._userSubscriber = session.currentUserInfo.subscribe(
			async userInfo => {
				if( userInfo.uid ) {
					this.trials = <Trial[]> await this.getTrialList();
				}
			}
		);
	}

	ngOnDestroy() {
		this._userSubscriber.unsubscribe();
	}

	async getTrialList() {
		// send data
		const config = {
			headers: {'Authorization': `Bearer ${ this.session.access_token }`}
		};
		return await axios.get( this.api.userTrials, config)
		.then( (response) => {
			if( response.status == 200 ) {
				return response.data.map( trial => {
					let now = Date.parse(Date());
					let state = { registration:null, trial:null, overall:'Unknown' };
					if( Date.parse(trial.regopen) > now ) {
						state.registration = 'Pending';
					} else if ( Date.parse(trial.regopen) < now && Date.parse(trial.regclose) > now ) {
						state.registration = 'Open';
					} else if ( Date.parse(trial.regclose) < now ) {
						state.registration = 'Closed';
					}
					if( Date.parse(trial.trialstart) > now ) {
						state.trial = 'Pending';
					} else if( Date.parse(trial.trialstart) < now && Date.parse(trial.trialend) > now ) {
						state.trial = 'Running';
					} else if( Date.parse(trial.trialend) < now ) {
						state.trial = 'Finished';
					}
					trial.status = state;
					return trial;
				});
			}
		})
		.catch( (error) => {
			console.warn(error);
			if( error.response.status == 401 ) { // Unauthorized
				this.session.setRedirectURL( '/dashboard' );
				this.router.navigate(['/login']);
			}
			return [];
		});
	}

}
