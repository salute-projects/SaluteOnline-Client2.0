import { Injector, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable, Observer } from 'rxjs';
import { Country } from "../../dto/common/index";
import { DashboardConfiguration, DashboardConfigurationItem, ClubDashboardConfiguration } from "../../dto/dashboard/index";

@Injectable()
export class ConfigurationApi {
    urls: any = {
        dashboardConfiguration: 'configuration/dashboardConfiguration',
        clubDashboardConfiguration: 'configuration/clubDashboardConfiguration/'
    }

    constructor(private readonly http: HttpClient) {
    }

    getDashboardConfiguration(): Observable<DashboardConfiguration> {
        return this.http.get<DashboardConfiguration>(apiSettings.baseUrl + this.urls.dashboardConfiguration);
    }

    saveDashboardConfiguration(panels: Array<DashboardConfigurationItem>) : Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.dashboardConfiguration, panels, { responseType: "text" });
    }

    getClubDashboardConfiguration(id: number) : Observable<ClubDashboardConfiguration> {
        return this.http.get<ClubDashboardConfiguration>(apiSettings.baseUrl + this.urls.clubDashboardConfiguration + id);
    }

    saveClubDashboardConfiguration(configuration: ClubDashboardConfiguration) : Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.clubDashboardConfiguration, configuration, { responseType: "text" });
    }
}