import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable } from 'rxjs';
import { Page } from "../../dto/common/index";
import { Helpers } from "../helpers";
import { ClubFilter, ClubAdministrationSummaryDto, ClubChangeStatusRequest } from "../../dto/clubs/index";

@Injectable()
export class AdminClubsApi {
    urls: any = {
        getClubsForAdministration: 'adminClubs',
        changeClubStatus: 'adminClubs/changeStatus'
    }

    constructor(private readonly http: HttpClient, private readonly helpers: Helpers) {
    }

    getClubsForAdministration(filter: ClubFilter) : Observable<Page<ClubAdministrationSummaryDto>> {
        return this.http.get<Page<ClubAdministrationSummaryDto>>(apiSettings.baseUrl + this.urls.getClubsForAdministration, { params: this.helpers.toHttpParams(filter) });
    }

    changeClubStatus(request: ClubChangeStatusRequest) : Observable<any> {
        return this.http.put(apiSettings.baseUrl + this.urls.changeClubStatus, request, { responseType: 'text' });
    }
}