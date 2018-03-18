import { Component, ViewEncapsulation, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Context } from "../../../services/context/context";
import { SoSnackService } from "../../../services/snack.service";
import { GlobalState } from "../../../services/global.state";
import { MatDialog, MatSort, PageEvent } from "@angular/material";
import { Location } from "@angular/common";
import { DataSource } from "@angular/cdk/collections";
import { Page } from "../../../dto/common/index";
import { CustomDataSource } from "../../../services/datatable.service";
import { SoDialogService } from "../../../services/dialog.service";
import * as _ from "lodash";
import { Helpers } from "../../../services/helpers";
import { Role, UserStatus } from "../../../dto/enums";
import { UserFilter } from "../../../dto/user/UserFilter";
import { UserDto } from "../../../dto/user/index";
import { SetRoleRequest } from "../../../dto/user/SetRoleRequest";
import { SetStatusRequest } from "../../../dto/user/SetStatusRequest";
@Component({
    selector: 'so-admin-users',
    styleUrls: ['./so-admin-users.scss'],
    templateUrl: './so-admin-users.html',
    encapsulation: ViewEncapsulation.None
})

export class SoAdminUsersList implements OnInit {

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly dialogService: SoDialogService,
        private readonly router: Router, private route: ActivatedRoute, private location: Location, private helpers: Helpers) {
    }

    filter = new UserFilter();
    users: Page<UserDto> = new Page<UserDto>();
    usersDataSet = new CustomDataSource([]);
    usersInitial : Array<UserDto> = [];
    countries : string[] = [];
    cities : string[] = [];
    isLoading = false;
    filteringEnabled = false;
    private clearFilterDisabled = true;

    displayedColumns = ['icon', 'name', 'email', 'country', 'city', 'role', 'status', 'registered', 'actions'];
    
    statuses = [
        { value: 1, title: 'Active', showInFilter: true, showInTable: true },
        { value: 2, title: 'Blocked', showInFilter: true, showInTable: true },
        { value: 3, title: 'Deleted', showInFilter: true, showInTable: true },
        { value: 0, title: 'None', showInFilter: false, showInTable: true },
        { value: 0, title: 'All', showInFilter: true, showInTable: false }
    ];
    
    getFilterStatuses() {
        return this.statuses.filter(t => t.showInFilter);
    }

    getTableStatuses() {
        return this.statuses.filter(t => t.showInTable);
    }

    roles = [
        { value: 1, title: 'User', showInFilter: true, showInTable: true },
        { value: 2, title: 'ClubAdmin', showInFilter: true, showInTable: true },
        { value: 3, title: 'SuperAdmin', showInFilter: true, showInTable: true },
        { value: 0, title: 'None', showInFilter: false, showInTable: true },
        { value: 0, title: 'All', showInFilter: true, showInTable: false }
    ]

    getFilterRoles() {
        return this.roles.filter(t => t.showInFilter);
    }

    getTableRoles() {
        return this.roles.filter(t => t.showInTable);
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(t => {
            if (!t.keys.length) {
                this.router.navigate([], { queryParams: { page: 1, role: Role.None, status: UserStatus.None } })
                return;
            }
            this.filter.page = Number(t.get('page'));
            this.filter.asc = t.has('asc') ? new Boolean(t.get('asc')).valueOf() : true;
            this.filter.role = t.has('role') ? Number(t.get('role')) : Role.None;
            this.filter.status = t.has('status') ? Number(t.get('status')) : UserStatus.None;
            this.filter.name = t.get('name');
            this.filter.email = t.get('email');
            this.filter.city = t.get('city');
            this.filter.country = t.get('country');
            this.filter.nickname = t.get('nickname');
            this.filter.orderBy = t.has('orderBy') ? t.get('orderBy') : "Registered";
            this.loadUsers();
            this.sort.sortChange.subscribe(() => {
                if (this.filteringEnabled)
                    return;
                this.filter.asc = this.sort.direction === "asc";
                this.filter.orderBy = this.helpers.capitalizeFirstLetter(this.sort.active);
                this.loadUsers();
            })
        })
    }

    @ViewChild(MatSort) 
    sort: MatSort;

    loadUsers() {
        this.isLoading = true;
        this.context.adminUsersApi.getUsers(this.filter).subscribe(result => {
            this.usersDataSet = new CustomDataSource(result.items);
            this.users = result;
            this.usersInitial = _.cloneDeep(result.items);
            this.setUrl();
            this.clearFilterDisabled = !this.isFilterApplied();
        }, error => {
            this.snackService.showError(error.error, "OK", 500);
        }, () => {
            this.isLoading = false;
        })
    }

    debouncedFilterChanged = _.debounce(t => {
        this.loadUsers();
    }, 500)

    getAvatar(base64: string) {
        return base64 ? `data:image/jpg;base64,${base64}` : '';
    }

    getDisplayName(user: UserDto) {
        return user.firstName + " " + user.lastName;
    }

    roleChanged(row: UserDto) {
        this.dialogService.open('CHANGE USER ROLE', 'Do you really want to change role of this user?').subscribe(confirmed => {
            if (confirmed != true) {
                var original = this.usersInitial.find(t => t.id == row.id);
                if (original) {
                    row.role = original.role;
                }
            } else {
                var request = new SetRoleRequest();
                request.userId = row.id;
                request.role = row.role;
                this.context.adminUsersApi.setUserRole(request).subscribe(result => {
                    this.snackService.showSuccess('Role successfully changed', 'OK')
                    var original = this.usersInitial.find(t => t.id == row.id);
                    if (original) {
                        original.role = row.role;
                    }
                }, error => {
                    this.snackService.showError(error.error, 'OK');
                });
            }
        });
    }

    statusChanged(row: UserDto) {
        this.dialogService.open('CHANGE USER STATUS', 'Do you really want to change status of this user?').subscribe(confirmed => {
            if (confirmed != true) {
                var original = this.usersInitial.find(t => t.id == row.id);
                if (original) {
                    row.status = original.status;
                }
            } else {
                var request = new SetStatusRequest();
                request.status = row.status;
                request.userId = row.id;
                this.context.adminUsersApi.setUserStatus(request).subscribe(result => {
                    this.snackService.showSuccess('Status successfully changed', 'OK');
                    var original = this.usersInitial.find(t => t.id == row.id);
                    if (original) {
                        original.status = row.status;
                    }
                }, error => {
                    this.snackService.showError(error.error, 'OK');
                })
            }
        })
    }

    paginationEvent(event: PageEvent) {
        this.filter.page = event.pageIndex + 1;
        this.filter.pageSize = event.pageSize;
        this.loadUsers();
    }

    toggleFiltering() {
        this.filteringEnabled = !this.filteringEnabled;
    }

    isFilterApplied() : boolean {
        return !!this.filter.name || !!this.filter.email || !!this.filter.nickname || !!this.filter.country || !!this.filter.city || this.filter.status !== UserStatus.None 
            || this.filter.role !== Role.None;
    }

    clearFilter() {
        this.filter.name = "";
        this.filter.email = "";
        this.filter.nickname = "";
        this.filter.country = "";
        this.filter.city = "";
        this.filter.status = UserStatus.None;
        this.filter.role = Role.None;
        this.filter.page = 1;
        this.filter.pageSize = 25;
        this.filter.asc = true;
        this.loadUsers();
    }

    setUrl() {
        const url = this.router.createUrlTree(['/admin/users'], { queryParams: _.pickBy(this.filter), queryParamsHandling: "merge" }).toString();
        this.location.go(url);
    }
}