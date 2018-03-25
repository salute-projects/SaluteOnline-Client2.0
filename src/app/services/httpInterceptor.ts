import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthenticationService } from "./authentication.service";
import { retry } from "rxjs/operator/retry";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private oidc: OidcSecurityService;

    constructor(private readonly injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('8999') > -1)
            return next.handle(req);
        if (this.oidc === undefined) {
            this.oidc = this.injector.get(OidcSecurityService);
        }
        if (this.oidc !== undefined) {
            let token = this.oidc.getToken();
            if (token !== "") {
                let tokenValue = "Bearer " + token;
                return next.handle(req.clone({ setHeaders: { "Authorization" : tokenValue } }));
            } else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }
    }
}