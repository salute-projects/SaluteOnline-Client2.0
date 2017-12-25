import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SoHeader } from '../components/so-header/so-header.component';
import { AuthService } from '../services/auth';
import { AuthGuard } from '../services/authGuard';
import { I18nService } from './i18n.service';
import { SoSidebar } from '../components/so-sidebar/so-sidebar.component';
import { ShellComponent } from './shell/shell.component';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SoMenuItem } from '../components/so-menu-item/so-menu-item.component';
import { SoMenu } from '../components/so-menu/so-menu.component';
import { LoginDialog } from '../components/so-login-dialog/so-login-dialog';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HttpModule,
    TranslateModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    SoMenuItem,
    SoMenu,
    SoHeader,
    SoSidebar,
    ShellComponent
  ],
  entryComponents: [LoginDialog],
  providers: [
    AuthService,
    AuthGuard,
    I18nService,
    HttpClient
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}