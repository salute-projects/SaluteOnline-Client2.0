import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { SigninCallbackComponent } from './signin-callback/signin-callback';
import { SilentRenewComponent } from './silent-renew/silent-renew';
import { SigninRoutingModule } from './signin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SigninRoutingModule
  ],
  declarations: [
      SigninCallbackComponent,
      SilentRenewComponent
  ],
  entryComponents: []
})
export class SigninModule { }