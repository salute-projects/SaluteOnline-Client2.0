import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClubsRoutingModule } from './clubs-routing.module';
import { SoClubsEdit } from './so-club-edit/so-club-edit';
import { SoClubsList } from './so-clubs-list/so-clubs-list.component';
import { AddClubMemberDialog } from './so-add-club-member/so-add-club-member';
import { CreateClubDialog } from './so-create-club-dialog/so-create-club-dialog';
import { SharedModule } from "../../shared/shared.module";
import { MembershipRequestDialog } from '../../components/so-membership-request-dialog/so-membership-request-dialog';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ClubsRoutingModule,
    SharedModule
  ],
  declarations: [
    SoClubsEdit,
    SoClubsList,
    AddClubMemberDialog,
    CreateClubDialog,
  ],
  entryComponents: [MembershipRequestDialog, CreateClubDialog, AddClubMemberDialog]
})
export class ClubsModule { }