import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable } from 'rxjs';
import { ClubDashboardStatisticDto } from "../../dto/statistic/index";

@Injectable()
export class ClubStatisticApi {
    urls: any = {
        getMyClubStatistic: 'clubStatistic'
    }

    constructor(private readonly http: HttpClient) {
    }

    getMyClubStatistic(): Observable<Array<ClubDashboardStatisticDto>> {
        return this.http.get<Array<ClubDashboardStatisticDto>>(apiSettings.baseUrl + this.urls.getMyClubStatistic);
    }
}