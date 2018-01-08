import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../core/i18n.service';
import { Route } from '../../core/route.service';
import { SoUserProfile } from './so-user-profile/so-user-profile.component';

const routes: Routes = Route.withShell([
  { path: 'profile', component: SoUserProfile }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule { }
