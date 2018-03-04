import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";
import { SoAdminClubsList } from './so-admin-clubs/so-admin-clubs.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SoSpinner } from '../../components/so-spinner/so-spinner';
import { SoProgressBar } from '../../components/so-progress-bar/so-progress-bar';
import { SoAdminUsersList } from './so-admin-users/so-admin-users';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    SoAdminClubsList,
    SoAdminUsersList,
    SoSpinner,
    SoProgressBar
  ],
  entryComponents: []
})
export class AdminModule { }