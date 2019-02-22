import { Routes } from '@angular/router';

import { AboutComponent } from '../components/about/about.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from '../components/admin-login/admin-login.component';
import { AdminNewTrialComponent } from '../components/admin-new-trial/admin-new-trial.component';
import { AdminTrialDetailsComponent } from '../components/admin-trial-details/admin-trial-details.component';
import { AdminRegistrationComponent } from '../components/admin-registration/admin-registration.component';
import { DocumentationComponent } from '../components/documentation/documentation.component';
import { DocumentationTOCComponent } from '../components/documentation/documentation.toc.component';
import { DocDevelopersComponent } from '../components/documentation/doc.developers.component';
import { DocParticipantsComponent } from '../components/documentation/doc.participants.component';
import { DocResearchersComponent } from '../components/documentation/doc.researchers.component';
import { HomeComponent } from '../components/home/home.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { PrivacyComponent } from '../components/legal/privacy.component';
import { TermsComponent } from '../components/legal/terms.component';


export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
		data: [{
			pageName: 'RCTrials'
		}]
	},
	{
		path: 'about',
		component: AboutComponent,
		data: [{
			pageName: 'About the Project'
		}]
	},
	{
		path: 'docs',
		component: DocumentationComponent,
		children: [
			{
				path: '',
				component: DocumentationTOCComponent,
				data: [{ pageName: 'Project Documentation' }]
			},
			{
				path: 'researchers',
				component: DocResearchersComponent,
				data: [{ pageName: 'Documentation for Researchers' }]
			},
			{
				path: 'participants',
				component: DocParticipantsComponent,
				data: [{ pageName: 'Documentation for Participants' }]
			},
			{
				path: 'developers',
				component: DocDevelopersComponent,
				data: [{ pageName: 'Documentation for Developers' }]
			},
		]
	},
	{
		path: 'privacy',
		component: PrivacyComponent,
		data: [{
			pageName: 'Privacy Policy'
		}]
	},
	{
		path: 'terms',
		component: TermsComponent,
		data: [{
			pageName: 'Terms and Conditions'
		}]
	},
	{
		path: 'register',
		component: AdminRegistrationComponent,
		data: [{
			pageName: 'Create a Researcher Account'
		}]
	},
	{
		path: 'login',
		component: AdminLoginComponent,
		data: [{
			pageName: 'Researcher Login'
		}]
	},
	{
		path: 'logout',
		component: LogoutComponent,
		data: [{
			pageName: 'Logout'
		}]
	},
	{
		path: 'dashboard',
		component: AdminDashboardComponent,
		data: [{
			pageName: 'RCTrials Dashboard'
		}]
	},
	{
		path: 'new-trial',
		component: AdminNewTrialComponent,
		data: [{
			pageName: 'New Trial'
		}]
	},
	{
		path: 'trial-details/:tid',
		component: AdminTrialDetailsComponent,
		data: [{
			pageName: 'Trial Details'
		}]
	}
]
