import { Injectable, EventEmitter } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { OidcSecurityService, AuthorizationResult } from "angular-auth-oidc-client";
import { retry } from "rxjs/operators/retry";
import { GlobalState } from "./global.state";

@Injectable()
export class AuthenticationService {

    constructor(public oidcSecurityService: OidcSecurityService, private state: GlobalState) {
    }

    initialize() {
        this.oidcSecurityService.onAuthorizationResult.subscribe((result: AuthorizationResult) => {
             if (result !== AuthorizationResult.authorized) {
                this.state.notifyDataChanged(this.state.events.global.logged, false);
                if (window.parent) {
                    window.parent.location.href = '/unauthorized';
                } else {
                    window.location.href = '/unauthorized';
                }
             }
        })

        this.oidcSecurityService.startCheckingSilentRenew();

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
        if (window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }
}

