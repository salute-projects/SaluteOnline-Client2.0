// system

import { AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration, AuthWellKnownEndpoints } from 'angular-auth-oidc-client';
import { isSettings, clientSettings } from "../app/configuration/constants";

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
import { MessagesModule } from "./modules/messages/messages.module";
import { ProfileModule } from './modules/profile/profile.module';
import { AdminModule } from "./modules/admin/admin.module";

// components

import { AppComponent } from './app.component';
import { MembershipRequestDialog } from './components/so-membership-request-dialog/so-membership-request-dialog';
import { SoProtocol } from './components/so-protocol/so-protocol';


// service

import { AppRoutingModule } from './app-routing.module';
import { Helpers } from './services/helpers';
import { AuthInterceptor } from './services/httpInterceptor';
import { HubService } from "./services/hub.service";
import { AuthenticationService } from './services/authentication.service';

// DAL

import { CommonApi } from './services/context/commonApi';
import { UserApi } from './services/context/userApi';
import { ClubsApi } from './services/context/clubsApi';
import { ChatApi } from './services/context/chatApi';
import { Context } from './services/context/context';

// third party

import { MATERIAL_SANITY_CHECKS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS, MatCardMdImage } from "@angular/material";
import { SoDialog } from './components/so-dialog/so-dialog';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule.forRoot(),
    ClubsModule,
    AdminModule,
    MessagesModule,
    ProfileModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MembershipRequestDialog,
    SoProtocol,
    SoDialog
  ],
  entryComponents: [SoDialog],
  providers: [
    OidcSecurityService,
    HubService,
    Helpers,
    AuthenticationService,
    CommonApi,
    UserApi,
    ClubsApi,
    ChatApi,
    Context,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public oidc: OidcSecurityService) {
    const conf = new OpenIDImplicitFlowConfiguration();
    conf.stsServer = isSettings.baseUrl;
    conf.redirect_url = clientSettings.baseUrl + "/signin-oidc";
    conf.client_id = "salute-online-webapplication";
    conf.response_type = "id_token token";
    conf.scope = "openid profile salute_security_api offline_access";
    conf.post_logout_redirect_uri = clientSettings.baseUrl + "/signout-callback-oidc";
    conf.start_checksession = true;
    conf.silent_renew = true;
    conf.forbidden_route = "/forbidden";
    conf.unauthorized_route = "/unauthorized";
    conf.log_console_warning_active = true;
    conf.log_console_debug_active = false;
    conf.max_id_token_iat_offset_allowed_in_seconds = 600;
    conf.storage = localStorage;

    const endpoints = new AuthWellKnownEndpoints();
    endpoints.issuer = isSettings.baseUrl;
    endpoints.jwks_uri = isSettings.baseUrl + "/.well-known/openid-configuration/jwks";
    endpoints.authorization_endpoint = isSettings.baseUrl + "/connect/authorize";
    endpoints.token_endpoint = isSettings.baseUrl + "/connect/token";
    endpoints.userinfo_endpoint = isSettings.baseUrl + "/connect/userinfo";
    endpoints.end_session_endpoint = isSettings.baseUrl + "/connect/endsession";
    endpoints.check_session_iframe = isSettings.baseUrl + "/connect/checksession";
    endpoints.revocation_endpoint = isSettings.baseUrl + "/connect/revocation";
    endpoints.introspection_endpoint = isSettings.baseUrl + "/connect/introspect";
    this.oidc.setupModule(conf, endpoints);
  }
 }
