import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Context } from "../../../services/context/context";
import { SoSnackService } from "../../../services/snack.service";
import { GlobalState } from "../../../services/global.state";
import { ClubSummaryDto } from "../../../dto/clubs/index";
import { ClubDashboardStatisticDto } from "../../../dto/statistic/index";
import { GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid, GridsterItemComponentInterface }  from 'angular-gridster2';
import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { AppComponent } from "../../../app.component";
import { WidgetType } from "../../../dto/enums";
import { DashboardConfigurationItem } from "../../../dto/dashboard/DashboardConfigurationItem";
import { resetFakeAsyncZone } from "@angular/core/testing";

@Component({
    selector: 'so-dashboard',
    templateUrl: './so-dashboard.html',
    styleUrls: ['./so-dashboard.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SoDashboard implements OnInit, OnDestroy {
    
    myClubs: ClubDashboardStatisticDto[] = [];
    gridOptions: GridsterConfig;
    dashboard: Array<GridsterItem> = [];

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly state: GlobalState,
        private readonly router: Router) {
            this.context.clubStatisticsApi.getMyClubStatistic().subscribe(result => {
                this.myClubs = result;
            })
    }

    ngOnInit(): void {
        this.gridOptions = {
            compactType: CompactType.CompactLeftAndUp,
            fixedColWidth: 105,
            fixedRowHeight: 105,
            ignoreMarginInRow: false,
            draggable: {
              enabled: true,
              dragHandleClass: 'draggable',
              ignoreContentClass: 'draggable-ignore'
            },
            resizable: {
              enabled: true,
            },
            pushItems: true
        }

        var defaultPanels = [
            { cols: 1, rows: 2, y: 0, x: 0, dragEnabled: true, resizeEnabled: true, widgetType: WidgetType.MyClubs, hasContent: true },
            { cols: 2, rows: 1, y: 0, x: 1, dragEnabled: true, resizeEnabled: true },
            { cols: 1, rows: 1, y: 0, x: 2, dragEnabled: true, resizeEnabled: true },
            { cols: 1, rows: 1, y: 1, x: 3, dragEnabled: true, resizeEnabled: true },
        ]

        this.context.configurationApi.getDashboardConfiguration().subscribe(result => {
            this.dashboard = result && result.panels && result.panels.length ? result.panels : defaultPanels;
            this.gridOptions.api.optionsChanged();
        }, error => {
            this.dashboard = defaultPanels;
        })
    }

    ngOnDestroy(): void {
        var args = this.dashboard.map(t => new DashboardConfigurationItem(t.cols, t.rows, t.y, t.x, t.resizeEnabled, t.dragEnabled, t.hasContent, t.widgetType));
        this.context.configurationApi.saveDashboardConfiguration(args).subscribe(t => {
        });
    }
}