import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatProgressSpinnerModule } from '@angular/material';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SessionService } from './services/session.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
	declarations: [
		AppComponent,
		SpinnerComponent,
		HomeComponent,
		AdminRegistrationComponent,
		AdminLoginComponent,
		AdminDashboardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
	],
	providers: [
		SessionService,
		SpinnerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
