import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { HomeComponent } from './components/home/home.component';
import { SessionService } from './services/session.service';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AdminRegistrationComponent,
		AdminLoginComponent,
		AdminDashboardComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		SessionService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
