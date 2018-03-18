import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable, Observer } from 'rxjs';
import { UserFilter } from "../../dto/user/UserFilter";
import { Helpers } from "../helpers";
import { Page } from "../../dto/common/index";
import { UserDto, SetRoleRequest, SetStatusRequest } from "../../dto/user/index";

@Injectable()
export class AdminUsersApi {
    urls: any = {
        getUsers: 'adminUsers',
        setUserRole: 'adminUsers/setRole',
        setStatus: 'adminUsers/setStatus'
    }

    constructor(private readonly http: HttpClient, private readonly helpers: Helpers) {
    }

    getUsers(filter: UserFilter) : Observable<Page<UserDto>> {
        return this.http.get<Page<UserDto>>(apiSettings.baseUrl + this.urls.getUsers, { params: this.helpers.toHttpParams(filter) });
    }

    setUserRole(request: SetRoleRequest) : Observable<any> {
        return this.http.put(apiSettings.baseUrl + this.urls.setUserRole, request, { responseType: "text" });
    }

    setUserStatus(request: SetStatusRequest) : Observable<any> {
        return this.http.put(apiSettings.baseUrl + this.urls.setStatus, request, { responseType: "text" });
    }
}