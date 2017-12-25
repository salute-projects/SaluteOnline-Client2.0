import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoClubsList } from "./so-clubs-list/so-clubs-list.component";
import { extract } from '../../core/i18n.service';
import { SoClubsEdit } from './so-club-edit/so-club-edit';
import { Route } from '../../core/route.service';

const routes: Routes = Route.withShell([
  { path: 'clubs', component: SoClubsList },
  { path: 'clubs/:id', component: SoClubsEdit }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClubsRoutingModule { }
