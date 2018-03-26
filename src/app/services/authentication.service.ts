import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { OidcSecurityService, AuthorizationResult } from "angular-auth-oidc-client";
import { retry } from "rxjs/operators/retry";
import { GlobalState } from "./global.state";

@Injectable()
export class AuthenticationService implements OnDestroy {

    constructor(public oidcSecurityService: OidcSecurityService, private state: GlobalState) {
        if (this.oidcSecurityService.moduleSetup) {
            this.doCallbackLogicIfRequired();
        } else {
            this.oidcSecurityService.onModuleSetup.subscribe(() => {
                this.doCallbackLogicIfRequired();
            });
        }

        // this.oidcSecurityService.onAuthorizationResult.subscribe((result: AuthorizationResult) => {
        //     do something after authorization
        // })
    }

    ngOnDestroy(): void {
        this.oidcSecurityService.onModuleSetup.unsubscribe();
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
        if (window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }
}

