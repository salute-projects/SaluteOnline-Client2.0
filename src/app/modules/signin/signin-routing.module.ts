import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../core/i18n.service';
import { Route } from '../../core/route.service';
import { SigninCallbackComponent } from './signin-callback/signin-callback';
import { SilentRenewComponent } from './silent-renew/silent-renew';

const routes: Routes = Route.withShell([
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'silent-renew', component: SilentRenewComponent }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SigninRoutingModule { }
