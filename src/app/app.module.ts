import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
	MatDialogModule,
	MatProgressSpinnerModule,
} from '@angular/material';

import { OverlayModule } from "@angular/cdk/overlay";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SessionService } from './services/session.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
	declarations: [
		AppComponent,
		SpinnerComponent,
		HomeComponent,
		DialogModalComponent,
		AdminRegistrationComponent,
		AdminLoginComponent,
		AdminDashboardComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		OverlayModule,
		MatDialogModule,
		MatProgressSpinnerModule,
	],
	entryComponents: [
		HomeComponent,
		DialogModalComponent,
	],
	providers: [
		SessionService,
		SpinnerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
