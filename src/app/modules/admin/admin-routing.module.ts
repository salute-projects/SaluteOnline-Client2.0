import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../core/i18n.service';
import { Route } from '../../core/route.service';
import { SoAdminClubsList } from './so-admin-clubs/so-admin-clubs.component';
import { SoAdminUsersList } from './so-admin-users/so-admin-users';

const routes: Routes = Route.withShell([
  { path: 'admin/clubs', component: SoAdminClubsList },
  { path: 'admin/clubs:id', component: SoAdminClubsList },
  { path: 'admin/users', component: SoAdminUsersList }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
