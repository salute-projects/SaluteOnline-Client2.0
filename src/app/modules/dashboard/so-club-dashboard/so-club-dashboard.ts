import { Component, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Context } from "../../../services/context/context";
import { SoSnackService } from "../../../services/snack.service";
import { GlobalState } from "../../../services/global.state";
import { GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid, GridsterItemComponentInterface }  from 'angular-gridster2';
import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { ClubWidgetType } from "../../../dto/enums";

@Component({
    selector: 'so-club-dashboard',
    templateUrl: './so-club-dashboard.html',
    styleUrls: ['./so-club-dashboard.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SoClubDashboard implements OnInit, OnDestroy {
    
    id: number;
    gridOptions: GridsterConfig;
    dashboard: Array<GridsterItem> = [];

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly state: GlobalState,
        private readonly router: Router, private readonly route: ActivatedRoute) {
            this.route.params.subscribe(params => {
                this.id = +params['id'];
            });
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
            { cols: 1, rows: 2, y: 0, x: 0, dragEnabled: true, resizeEnabled: true, clubWidgetType: ClubWidgetType.MainStatistics, hasContent: true },
            { cols: 2, rows: 1, y: 0, x: 1, dragEnabled: true, resizeEnabled: true },
            { cols: 1, rows: 1, y: 0, x: 2, dragEnabled: true, resizeEnabled: true },
            { cols: 1, rows: 1, y: 1, x: 3, dragEnabled: true, resizeEnabled: true },
        ]

        this.dashboard = defaultPanels;
        debugger;
        this.context.configurationApi.getClubDashboardConfiguration(this.id).subscribe(result => {
            debugger;
        }, error => {
            this.snackService.showError(error.error, "OK", 5000);
        })
    }

    ngOnDestroy(): void {
    }
}