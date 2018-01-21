import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MessagesRoutingModule } from './messages-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { SoMessagesList } from './so-messages-list/so-messages-list';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule.forRoot(),
    MessagesRoutingModule
  ],
  declarations: [
      SoMessagesList
  ],
  entryComponents: []
})
export class MessagesModule { }