import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../../core/route.service';
import { SoDashboard } from './so-dashboard/so-dashboard';
import { SoClubDashboard } from './so-club-dashboard/so-club-dashboard';

const routes: Routes = Route.withShell([
  { path: 'dashboard', component: SoDashboard },
  { path: 'club-dashboard/:id', component: SoClubDashboard }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }
