import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { HomeComponent } from './components/home/home.component';


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
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
