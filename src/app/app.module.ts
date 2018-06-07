import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationService } from './services/registration.service';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AdminRegistrationComponent,
		AdminLoginComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		RegistrationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
