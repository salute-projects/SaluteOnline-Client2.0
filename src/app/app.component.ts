import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs/observable/merge';
import { filter, map, mergeMap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Logger } from './core/logger.service';
import { I18nService } from './core/i18n.service';
import { SoSnackService } from './services/snack.service';
import { SoDialogService } from './services/dialog.service';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthenticationService } from './services/authentication.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SoSnackService, SoDialogService]
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private translateService: TranslateService, private i18nService: I18nService,
    public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    //this.authenticationService.initialize();

    // if (!window.location.pathname || window.location.pathname === '/') {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  ngOnDestroy() {
    this.authenticationService.unsubscribe();
  }
}
