// system

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// modules

import { CoreModule } from './core/core.module';
import { SharedModule } from "./shared/shared.module";
import { ClubsModule } from "./modules/clubs/clubs.module";

// components

import { AppComponent } from './app.component';

import { LoginDialog } from './components/so-login-dialog/so-login-dialog';
import { SoUserProfile } from './components/so-user-profile/so-user-profile.component';
import { MembershipRequestDialog } from './components/so-membership-request-dialog/so-membership-request-dialog';
import { SoMessages } from './components/so-messages/so-messages';
import { SoProtocol } from './components/so-protocol/so-protocol';


// service

import { AppRoutingModule } from './app-routing.module';
import { GlobalState } from "./services/global.state";
import { Helpers } from './services/helpers';
import { AuthService } from './services/auth';
import { AuthInterceptor } from './services/httpInterceptor';

// DAL

import { CommonApi } from './services/context/commonApi';
import { UserApi } from './services/context/userApi';
import { ClubsApi } from './services/context/clubsApi';
import { InnerMessageApi } from './services/context/innerMessageApi';
import { Context } from './services/context/context';

// third party

import { MATERIAL_SANITY_CHECKS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS, MatCardMdImage } from "@angular/material";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    ClubsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    LoginDialog,
    SoUserProfile,
    MembershipRequestDialog,
    SoMessages,
    SoProtocol
  ],
  providers: [
    Helpers,
    GlobalState,
    AuthService,
    CommonApi,
    UserApi,
    ClubsApi,
    InnerMessageApi,
    Context,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
