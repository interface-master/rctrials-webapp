import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trial } from '../../models/trial.model';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';

import axios from 'axios';
import { Chart } from 'chart.js';


@Component({
	selector: 'admin-trial-details',
	templateUrl: './admin-trial-details.component.html',
	styleUrls: ['./admin-trial-details.component.scss']
})
export class AdminTrialDetailsComponent implements OnInit, OnDestroy {
	private _tid:string;
	private _routeSubscriber:any;

	private charts = {};
	private chartX = null;
	private _chartsRendered = false;

	public trial:Trial;
	private questions = [];

	constructor(
		private api: ApiService,
		private session: SessionService,
		private route: ActivatedRoute,
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
			headers: {'Authorization': `Bearer ${ this.session.access_token }`}
		};
		return await axios.get( this.api.trialDetails.replace(':tid',this._tid), config)
		.then( (response) => {
			if( response.status == 200 ) {
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
				// consolidate questions
				this.questions = enrichedTrial.surveys
						.map( s => s.questions.reduce( (a,c) => [...a, c], [] ) )
						.reduce( (a,c) => [...a, ...c], [] );
				// fin
				return enrichedTrial;
			}
			else if ( response.status == 204 ) {
				return { tid:'0', title:"No Trial "+this._tid+" Found" };
			}
		})
		.catch( (error) => {
			console.warn(error);
			return [];
		});
	}

	configureCharts() {
		// generate charts from answer data
		for( let q = 0; q < this.questions.length; q++ ) {
			if( this.questions[q].totals ) {
				// gather labels and values
				let dataLabels = [], dataPoints = [];
				this.questions[q].totals.map( v => {
					dataLabels.push( this.questions[q].options.split('|')[v.text] || v.text );
					dataPoints.push( { y : parseInt(v.count) } );
				});
				let obj = {
					data: dataPoints,
					borderColor: '#00c9',
					backgroundColor: '#00c9',
				}
				// build chart
				let qid = this.questions[q].qid;
				this.charts[qid] = new Chart(`chart-${qid}`,{
					type: "bar",
					data: {
						labels: dataLabels,
						datasets: [obj]
					},
					options: {
						legend: {
							display: false
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true,
									callback: (val) => { if( val % 1 === 0 ) { return val; } }
								}
							}]
						}
					}
				});
			}
			if( this.questions[q].answers ) {
				let oldUID = '', dataPoints = [], datasets = [];
				for( let v = 0; v < this.questions[q].answers.length; v++ ) {
					let a = this.questions[q].answers[v];
					if( oldUID != a.uid ) {
						let r = (23 * datasets.length); // prime so that goes through all the shades
						datasets.push({
							data: dataPoints,
							borderColor: 'hsla('+r+',100%,50%,0.625)',
							backgroundColor: 'hsla('+r+',100%,50%,0.625)',
							fill: false
						});
						oldUID = a.uid;
						dataPoints = [];
					}
					dataPoints.push({ y: parseInt(a.text), x: a.timestamp });
				}
				// build chart
				let qid = this.questions[q].qid;
				this.charts[qid] = new Chart(`chart-${qid}`,{
					type: "line",
					data: {
						datasets: datasets
					},
					options: {
						legend: {
							display: false
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true,
									callback: (val) => { if( val % 1 === 0 ) { return val; } }
								}
							}],
							xAxes: [{
								type: 'time',
								time: {
									unit: 'day'
								}
							}]
						}
					}
				});
			}
		}
	}

	clickedQuestion(event:any) {
		event.currentTarget.classList.toggle('zoomed');
	}

	ngAfterContentChecked() {
		if( !this._chartsRendered && this.trial ) {
			let nodes = document.querySelectorAll('[id^=chart-]').length;
			console.log("checking DOM nodes:", nodes );
			if( nodes == this.questions.length ) {
				// RENDER CHARTS
				console.log("RENDERING NOW");
				this.configureCharts();
				this._chartsRendered = true;
			}
		}
	}

}
