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
	MatTabsModule,
	MatTooltipModule
} from '@angular/material';

import { OverlayModule } from "@angular/cdk/overlay";

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';

import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminNewTrialComponent } from './components/admin-new-trial/admin-new-trial.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminTrialDetailsComponent } from './components/admin-trial-details/admin-trial-details.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { DocumentationTOCComponent } from './components/documentation/documentation.toc.component';
import { DocDevelopersComponent } from './components/documentation/doc.developers.component';
import { DocParticipantsComponent } from './components/documentation/doc.participants.component';
import { DocResearchersComponent } from './components/documentation/doc.researchers.component';
import { Error404Component } from './components/error/404.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PrivacyComponent } from './components/legal/privacy.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TermsComponent } from './components/legal/terms.component';

import { ApiService } from './services/api.service';
import { SessionService } from './services/session.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
	declarations: [
		AboutComponent,
		AdminRegistrationComponent,
		AdminLoginComponent,
		AdminDashboardComponent,
		AdminNewTrialComponent,
		AdminTrialDetailsComponent,
		AppComponent,
		AppHeaderComponent,
		AppFooterComponent,
		DialogModalComponent,
		DocumentationComponent,
		DocumentationTOCComponent,
		DocDevelopersComponent,
		DocParticipantsComponent,
		DocResearchersComponent,
		Error404Component,
		HomeComponent,
		LogoutComponent,
		PrivacyComponent,
		SpinnerComponent,
		TermsComponent,
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
		MatTooltipModule
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
