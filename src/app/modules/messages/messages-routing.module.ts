import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../core/i18n.service';
import { Route } from '../../core/route.service';
import { SoMessagesList } from './so-messages-list/so-messages-list';

const routes: Routes = Route.withShell([
  { path: 'messages', component: SoMessagesList },
  { path: 'messages/:guid', component: SoMessagesList }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MessagesRoutingModule { }
