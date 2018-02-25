import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";
import { SoAdminClubsList } from './so-admin-clubs/so-admin-clubs.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    SoAdminClubsList
  ],
  entryComponents: []
})
export class AdminModule { }