import { Component, ViewEncapsulation, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Context } from "../../../services/context/context";
import { SoSnackService } from "../../../services/snack.service";
import { GlobalState } from "../../../services/global.state";
import { MatDialog, MatSort, PageEvent } from "@angular/material";
import { ClubFilter } from "../../../dto/clubs/ClubFilter";
import { ClubStatus } from "../../../dto/enums";
import { Location, LocationStrategy } from "@angular/common";
import { DataSource } from "@angular/cdk/collections";
import { ClubAdministrationSummaryDto, ClubInfoAggregation } from "../../../dto/clubs/index";
import { Page } from "../../../dto/common/index";
import { CustomDataSource } from "../../../services/datatable.service";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { SoDialogService } from "../../../services/dialog.service";
import * as _ from "lodash";
import { ClubChangeStatusRequest } from "../../../dto/clubs/ClubChangeStatusRequest";
import { Helpers } from "../../../services/helpers";

@Component({
    selector: 'so-admin-clubs',
    styleUrls: ['./so-admin-clubs.component.scss'],
    templateUrl: './so-admin-clubs.component.html',
    encapsulation: ViewEncapsulation.None
})

export class SoAdminClubsList implements OnInit {

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly dialogService: SoDialogService,
        private readonly router: Router, private route: ActivatedRoute, private location: Location, private helpers: Helpers,
        private readonly url: LocationStrategy) {
    }

    filteringEnabled = false;
    private filter: ClubFilter = new ClubFilter();
    clubsDataSet = new CustomDataSource<ClubAdministrationSummaryDto>([]);
    clubs = new Page<ClubAdministrationSummaryDto>();
    private clubsInitial: Array<ClubAdministrationSummaryDto> = [];
    countries : string[] = [];
    cities : string[] = [];
    isLoadingResults = true;
    clearFilterDisabled = true;

    displayedColumns = ['icon', 'title', 'status', 'country', 'city', 'registered', 'author', 'actions'];
    statuses = [
        { value: 1, title: 'Active', showInFilter: true, showInTable: true },
        { value: 2, title: 'Pending', showInFilter: true, showInTable: true },
        { value: 3, title: 'Blocked', showInFilter: true, showInTable: true },
        { value: 4, title: 'Deleted', showInFilter: true, showInTable: true },
        { value: 0, title: 'None', showInFilter: false, showInTable: true },
        { value: 0, title: 'All', showInFilter: true, showInTable: false }
    ];

    getFilterStatuses() {
        return this.statuses.filter(t => t.showInFilter);
    }

    getTableStatuses() {
        return this.statuses.filter(t => t.showInTable);
    }

    @ViewChild(MatSort) 
    sort: MatSort;

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(t => {
            if (!t.keys.length) {
                this.router.navigate([], { queryParams: { page: 1, status: ClubStatus.None, pageSize: 25 } })
                return;
            }
            this.filter.page = Number(t.get('page'));
            this.filter.pageSize = Number(t.get('pageSize'));
            this.filter.status = Number(t.get('status'));
            this.filter.asc = t.has('asc') ? new Boolean(t.get('asc')).valueOf() : true;
            this.filter.city = t.get('city') || '';
            this.filter.country = t.get('country') || '';
            this.filter.title = t.get('title') || '';
            this.loadClubs();
            this.loadAggregation();
            this.sort.sortChange.subscribe(() => {
                if (this.filteringEnabled)
                    return;
                this.filter.asc = this.sort.direction === "asc";
                this.filter.orderBy = this.helpers.capitalizeFirstLetter(this.sort.active);
                this.loadClubs();
            })
        })
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
                this.context.adminClubsApi.changeClubStatus(request).subscribe(result => {
                    this.snackService.showSuccess('Club status successfully changed', 'OK', 500)
                    var original = this.clubsInitial.find(t => t.id == row.id);
                    if (original) {
                        original.status = row.status;
                    }
                }, error => {
                    this.snackService.showError(error.error, 'OK');
                });
            }
        });
    }

    paginationEvent(event: PageEvent) {
        this.filter.page = event.pageIndex + 1;
        this.filter.pageSize = event.pageSize;
        this.loadClubs();
    }

    debouncedFilterChanged = _.debounce(t => {
        this.loadClubs();
    }, 500)

    loadClubs() {
        this.isLoadingResults = true;
        this.context.adminClubsApi.getClubsForAdministration(this.filter).subscribe(result => {
            this.clubsDataSet = new CustomDataSource<ClubAdministrationSummaryDto>(result.items);
            this.clubs = result;
            this.clubsInitial = _.cloneDeep(result.items);
            this.setUrl();
            this.clearFilterDisabled = !this.isFilterApplied();
        }, error => {
            this.snackService.showError(error.error, "OK", 5000);
        }, () => {
            this.isLoadingResults = false;
        })
    }

    loadAggregation() {
        this.context.clubsApi.getClubInfoAggregation().subscribe(result => {
            this.countries = result.geography.map(t => t.key);
            this.cities = result.geography.map(t => t.value).reduce((a, b) => a.concat(b), []);
        });
    }

    toggleFiltering() {
        this.filteringEnabled = !this.filteringEnabled;
    }

    isFilterApplied() : boolean {
        return !!this.filter.title || this.filter.status !== ClubStatus.None || !!this.filter.country || !!this.filter.city;
    }

    clearFilter() {
        this.filter.title = "";
        this.filter.status = ClubStatus.None;
        this.filter.country = "";
        this.filter.city = "";
        this.filter.page = 1;
        this.filter.pageSize = 25;
        this.filter.asc = true;
        this.loadClubs();
    }

    setUrl() {
        const url = this.router.createUrlTree(['/admin/clubs'], { queryParams: _.pickBy(this.filter), queryParamsHandling: "merge" }).toString();
        this.location.go(url);
    }
}