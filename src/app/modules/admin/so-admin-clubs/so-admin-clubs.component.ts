import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Context } from "../../../services/context/context";
import { SoSnackService } from "../../../services/snack.service";
import { GlobalState } from "../../../services/global.state";
import { MatDialog } from "@angular/material";
import { ClubFilter } from "../../../dto/clubs/ClubFilter";
import { ClubStatus } from "../../../dto/enums";
import { Location } from "@angular/common";
import { DataSource } from "@angular/cdk/collections";
import { ClubAdministrationSummaryDto } from "../../../dto/clubs/index";
import { Page } from "../../../dto/common/index";
import { CustomDataSource } from "../../../services/datatable.service";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { SoDialogService } from "../../../services/dialog.service";
import * as _ from "lodash";
import { ClubChangeStatusRequest } from "../../../dto/clubs/ClubChangeStatusRequest";

@Component({
    selector: 'so-admin-clubs',
    styleUrls: ['./so-admin-clubs.component.scss'],
    templateUrl: './so-admin-clubs.component.html',
    encapsulation: ViewEncapsulation.None
})

export class SoAdminClubsList implements OnInit {

    private filter: ClubFilter = new ClubFilter();
    private clubsDataSet = new CustomDataSource<ClubAdministrationSummaryDto>([]);
    private clubs = new Page<ClubAdministrationSummaryDto>();
    private clubsInitial: Array<ClubAdministrationSummaryDto> = [];

    displayedColumns = ['icon', 'title', 'status', 'country', 'city', 'registered', 'author', 'actions'];
    statuses = [{ value: 1, title: 'Active' },
        { value: 2, title: 'Pending' },
        { value: 3, title: 'Blocked' },
        { value: 4, title: 'Deleted' },
        { value: 0, title: 'None' }];

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly dialogService: SoDialogService,
        private readonly router: Router, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(t => {
            if (!t.keys.length) {
                this.router.navigate([], { queryParams: { page: 1, status: ClubStatus.All } })
                return;
            }
            this.filter.page = Number(t.get('page'));
            this.filter.status = ClubStatus[t.get('status')];
            this.filter.asc = t.has('asc') ? new Boolean(t.get('asc')).valueOf() : true;
            this.filter.city = t.get('city') || '';
            this.filter.country = t.get('country') || '';
            this.filter.title = t.get('title') || '';
            this.context.clubsApi.getClubsForAdministration(this.filter).subscribe(result => {
                this.clubsDataSet = new CustomDataSource<ClubAdministrationSummaryDto>(result.items);
                this.clubs = result;
                this.clubsInitial = _.cloneDeep(result.items);
            }, error => {
            })
        })
    }

    getLength<T>(page: Page<T>) {
        return page.items ? page.items.length : 0;
    }

    getStatusDisplay(status: ClubStatus) {
        switch(status) {
            case ClubStatus.Active:
                return "Active";
            case ClubStatus.PendingActivation:
                return "Pending";
            case ClubStatus.Blocked:
                return "Blocked";
            case ClubStatus.Deleted:
                return "Deleted";
            default:
                return "None";
        }
    }

    getClubAvatar(base64: string) {
        return base64 ? `data:image/jpg;base64,${base64}` : '';
    }

    statusChanged(row: ClubAdministrationSummaryDto) {
        this.dialogService.open('CHANGE CLUB STATUS', 'Do you really want to change club status?').subscribe(confirmed => {
            if (confirmed != true) {
                var original = this.clubsInitial.find(t => t.id == row.id);
                if (original) {
                    row.status = original.status;
                }
            } else {
                var request = new ClubChangeStatusRequest();
                request.clubId = row.id;
                request.status = row.status;
                this.context.clubsApi.changeClubStatus(request).subscribe(result => {
                    this.snackService.showSuccess('Club status successfully changed', 'OK')
                    var original = this.clubsInitial.find(t => t.id == row.id);
                    if (original) {
                        original.status = row.status;
                    }
                }, error => {
                    this.snackService.showError(error.error, 'OK');
                });
            }
            debugger;
        }, error => {
            debugger;
        });
    }
}