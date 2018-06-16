import { Routes } from '@angular/router';

import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from '../components/admin-login/admin-login.component';
import { AdminRegistrationComponent } from '../components/admin-registration/admin-registration.component';
import { HomeComponent } from '../components/home/home.component';


export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: HomeComponent,
		data: [{
			pageName: 'MRCT'
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
		path: 'dashboard',
		component: AdminDashboardComponent,
		data: [{
			pageName: 'MRCT'
		}]
	}
]
