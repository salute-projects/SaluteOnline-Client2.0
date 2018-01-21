import { Injectable, Injector } from "@angular/core";
import { UserApi } from "./userApi";
import { CommonApi } from "./commonApi";
import { ClubsApi } from "./clubsApi";
import { ChatApi } from "./chatApi";
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../../services/auth";

@Injectable()
export class Context {
    userApi: UserApi;
    commonApi: CommonApi;
    clubsApi: ClubsApi;
    chatApi: ChatApi;

    constructor(private readonly userApiWrapper: UserApi, private readonly commonApiWrapper: CommonApi, private readonly clubsApiWrapper: ClubsApi, private readonly chatApiWrapper: ChatApi) {
        this.userApi = userApiWrapper;
        this.commonApi = commonApiWrapper;
        this.clubsApi = clubsApiWrapper;
        this.chatApi = chatApiWrapper;
    }
}