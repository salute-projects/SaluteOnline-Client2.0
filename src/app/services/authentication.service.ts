import { Injectable, EventEmitter } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { retry } from "rxjs/operators/retry";

@Injectable()
export class AuthenticationService {

    constructor(public oidcSecurityService: OidcSecurityService) {
    }

    initialize() {
        debugger;
        if (this.oidcSecurityService.moduleSetup) {
            this.doCallbackLogicIfRequired();
        } else {
            this.oidcSecurityService.onModuleSetup.subscribe(() => {
                this.doCallbackLogicIfRequired();
            })
        }
    }

    login() {
        this.oidcSecurityService.authorize();
    }

    unsubscribe() {
        this.oidcSecurityService.onModuleSetup.unsubscribe();
    }

    logoff() {
        this.oidcSecurityService.logoff();
    }

    getToken() {
        return this.oidcSecurityService.getToken();
    }

    isAuthenticated() {
        return this.oidcSecurityService.getIsAuthorized();
    }

    private doCallbackLogicIfRequired() {
        debugger;
        if (window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }
}

