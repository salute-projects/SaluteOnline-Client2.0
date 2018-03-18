import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../../core/route.service';
import { SoDashboard } from './so-dashboard/so-dashboard';

const routes: Routes = Route.withShell([
  { path: 'dashboard', component: SoDashboard }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }
