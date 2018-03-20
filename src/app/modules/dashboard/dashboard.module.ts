import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SoDashboard } from './so-dashboard/so-dashboard';
import { NgCircleProgressModule } from "ng-circle-progress";
import { GridsterModule } from "angular-gridster2";
import { SoClubDashboard } from './so-club-dashboard/so-club-dashboard';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    DashboardRoutingModule,
    NgCircleProgressModule.forRoot({
        animation: true,
        animationDuration: 300,
        radius: 50,
        outerStrokeWidth: 8,
        percent: 100,
        showInnerStroke: false,
        showUnits: false,
        outerStrokeColor: '#3f51b5',
        titleFontSize: '36',
        titleColor: '#3f51b5',
        renderOnClick: false
    }),
    GridsterModule
  ],
  declarations: [
      SoDashboard,
      SoClubDashboard
  ],
  entryComponents: []
})
export class DashboardModule { }