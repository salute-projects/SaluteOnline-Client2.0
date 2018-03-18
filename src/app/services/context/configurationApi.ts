import { Injector, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable, Observer } from 'rxjs';
import { Country } from "../../dto/common/index";
import { DashboardConfiguration, DashboardConfigurationItem } from "../../dto/dashboard/index";

@Injectable()
export class ConfigurationApi {
    urls: any = {
        dashboardConfiguration: 'configuration/dashboardConfiguration'
    }

    constructor(private readonly http: HttpClient) {
    }

    getDashboardConfiguration(): Observable<DashboardConfiguration> {
        return this.http.get<DashboardConfiguration>(apiSettings.baseUrl + this.urls.dashboardConfiguration);
    }

    saveDashboardConfiguration(panels: Array<DashboardConfigurationItem>) : Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.dashboardConfiguration, panels, { responseType: "text" });
    }
}