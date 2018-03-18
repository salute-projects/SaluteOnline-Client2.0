import { Injectable, Injector } from "@angular/core";
import { UserApi } from "./userApi";
import { CommonApi } from "./commonApi";
import { ClubsApi } from "./clubsApi";
import { ChatApi } from "./chatApi";
import { HttpClient } from '@angular/common/http';
import { AdminClubsApi } from "./adminClubs";
import { AdminUsersApi } from "./adminUsersApi";
import { ClubStatisticApi } from "./clubStatisticApi";
import { ConfigurationApi } from "./configurationApi";

@Injectable()
export class Context {
    userApi: UserApi;
    commonApi: CommonApi;
    clubsApi: ClubsApi;
    chatApi: ChatApi;
    adminClubsApi: AdminClubsApi;
    adminUsersApi: AdminUsersApi;
    clubStatisticsApi: ClubStatisticApi;
    configurationApi: ConfigurationApi;

    constructor(private readonly userApiInstance: UserApi, private readonly commonApiInstance: CommonApi, private readonly clubsApiInstance: ClubsApi, private readonly chatApiInstance: ChatApi, 
        private readonly adminClubsApiInstance: AdminClubsApi, private readonly adminUsersApiInstance: AdminUsersApi, private readonly clubStatisticsApiInstance: ClubStatisticApi,
        private readonly configurationApiInstance: ConfigurationApi) {
        this.userApi = userApiInstance;
        this.commonApi = commonApiInstance;
        this.clubsApi = clubsApiInstance;
        this.chatApi = chatApiInstance;
        this.adminClubsApi = adminClubsApiInstance;
        this.adminUsersApi = adminUsersApiInstance;
        this.clubStatisticsApi = clubStatisticsApiInstance;
        this.configurationApi = configurationApiInstance;
    }
}