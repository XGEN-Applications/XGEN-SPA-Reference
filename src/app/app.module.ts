import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import fontawesome from '@fortawesome/fontawesome';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// ADD IMPORTED ICONS - e.g.

import {
  faLock,
  faUser,
  faEnvelopeSquare,
  faAt,
  faCog,
  faSignOutAlt,
  faTimes,
  faInfoCircle,
  faPenSquare,
  faMinusSquare
} from '@fortawesome/fontawesome-free-solid';
import {
  faCheckCircle,
  faEdit,
  faSave,
  faPlusSquare
} from '@fortawesome/fontawesome-free-regular';
import { RegisterComponent } from './components/register/register.component';
import { MobileNavbarViewComponent } from './components/navbars/mobile-navbar-view/mobile-navbar-view.component';
import { NavbarComponent } from './components/navbars/navbar/navbar.component';
import { SideNavbarComponent } from './components/navbars/side-navbar/side-navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AppService } from './services/app.service';
import { AlertMessagesComponent } from './components/alert-messages/alert-messages.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { HelpComponent } from './components/help/help.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

fontawesome.library.add(
  faUser,
  faLock,
  faAt,
  faCog,
  faSignOutAlt,
  faCheckCircle,
  faEdit,
  faSave,
  faPlusSquare,
  faPenSquare,
  faMinusSquare
);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MobileNavbarViewComponent,
    NavbarComponent,
    SideNavbarComponent,
    HomepageComponent,
    AlertMessagesComponent,
    ProjectsComponent,
    ProjectFormComponent,
    SettingsComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    HelpComponent,
    ConfirmComponent
  ],

  entryComponents: [
    ConfirmComponent
  ],

  imports: [
    BrowserModule, 
    FormsModule,
    NgbModule.forRoot(), 
    HttpClientModule,
    routing
  ],

  providers: [
    appRoutingProviders,
    AppService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
