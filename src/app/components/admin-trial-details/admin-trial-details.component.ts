import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trial } from '../../models/trial.model';
import { ApiService } from '../../services/api.service';
import { SessionService } from "../../services/session.service";

import axios from 'axios';


@Component({
	selector: 'admin-trial-details',
	templateUrl: './admin-trial-details.component.html',
	styleUrls: ['./admin-trial-details.component.scss']
})
export class AdminTrialDetailsComponent implements OnInit, OnDestroy {
	private _tid:string;
	private _routeSubscriber:any;

	public trial:Trial;

	constructor(
		private api: ApiService,
		private route: ActivatedRoute,
		private session: SessionService
	) { }

	async ngOnInit() {
		this._routeSubscriber = await this.route.params.subscribe( async (params) => {
			this._tid = params['tid'];
			this.trial = <Trial> await this.getTrialDetails();
		});
	}

	ngOnDestroy() {
		this._routeSubscriber.unsubscribe();
	}

	async getTrialDetails() {
		// send data
		const config = {
			headers: {'Authorization': `Bearer ${ this.session.parseCookie( 'access_token' ) }`}
		};
		return await axios.get( this.api.trialDetails.replace(':tid',this._tid), config)
		.then( (response) => {
			console.log('a-t-d-response',response);
			if( response.status == 200 ) {
				console.log('a-t-d-trial',response.data);
				let enrichedTrial = response.data;
				// registration status
				let now = Date.parse(Date());
				let state = { registration:null, trial:null, overall:'Unknown' };
				if( Date.parse(enrichedTrial.regopen) > now ) {
					state.registration = 'Pending';
				} else if ( Date.parse(enrichedTrial.regopen) < now && Date.parse(enrichedTrial.regclose) > now ) {
					state.registration = 'Open';
				} else if ( Date.parse(enrichedTrial.regclose) < now ) {
					state.registration = 'Closed';
				}
				if( Date.parse(enrichedTrial.trialstart) > now ) {
					state.trial = 'Pending';
				} else if( Date.parse(enrichedTrial.trialstart) < now && Date.parse(enrichedTrial.trialend) > now ) {
					state.trial = 'Running';
				} else if( Date.parse(enrichedTrial.trialend) < now ) {
					state.trial = 'Finished';
				}
				enrichedTrial.status = state;
				// answer counts
				enrichedTrial.totalAnswers = enrichedTrial.answers.reduce( (a,c) => {
					return a + Number(c.answers);
				}, 0);
				// subjects counts
				enrichedTrial.totalSubjects = enrichedTrial.subjects.reduce( (a,c) => {
					return a + Number(c.subjects);
				}, 0);
				// fin
				return enrichedTrial;
			}
		})
		.catch( (error) => {
			console.warn(error);
			return [];
		});
	}

}
