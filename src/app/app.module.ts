import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatNativeDateModule,
	MatProgressSpinnerModule,
	MatSelectModule
} from '@angular/material';

import { OverlayModule } from "@angular/cdk/overlay";

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminNewTrialComponent } from './components/admin-new-trial/admin-new-trial.component';
import { AdminNewTrialCardComponent } from './components/admin-new-trial/admin-new-trial-card.component';
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
		AdminNewTrialComponent,
		AdminNewTrialCardComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		OverlayModule,
		AppRoutingModule,

		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatNativeDateModule,
		MatProgressSpinnerModule,
		MatSelectModule,
	],
	entryComponents: [
		HomeComponent,
		DialogModalComponent,
	],
	providers: [
		SessionService,
		SpinnerService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
