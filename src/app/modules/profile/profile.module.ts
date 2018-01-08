import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from "../../shared/shared.module";
import { SoUserProfile } from './so-user-profile/so-user-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    SoUserProfile
  ],
  entryComponents: []
})
export class ProfileModule { }