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
	MatDividerModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatStepperModule,
	MatTabsModule
} from '@angular/material';

import { OverlayModule } from "@angular/cdk/overlay";

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminNewTrialComponent } from './components/admin-new-trial/admin-new-trial.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminTrialDetailsComponent } from './components/admin-trial-details/admin-trial-details.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ApiService } from './services/api.service';
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
		AdminTrialDetailsComponent,
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
		MatDividerModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		MatNativeDateModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatStepperModule,
		MatTabsModule,
	],
	entryComponents: [
		HomeComponent,
		DialogModalComponent,
	],
	providers: [
		ApiService,
		SessionService,
		SpinnerService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
