﻿import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable, Observer } from 'rxjs';
import { UserDto, UserMainInfoDto, UserPersonalInfoDto, SetRoleRequest, SetStatusRequest } from "../../dto/user/index";
import { UserFilter } from "../../dto/user/UserFilter";
import { Helpers } from "../helpers";
import { Page } from "../../dto/common/index";

@Injectable()
export class UserApi {
    urls: any = {
        getUserInfo: 'user',
        updateUserInfo: 'user',
        updateMainUserInfo: 'user',
        updatePersonalUserInfo: 'user',
        uploadAvatar: 'user/uploadAvatar'
    }

    constructor(private readonly http: HttpClient, private readonly helpers: Helpers) {
    }

    getUserInfo(): Observable<UserDto> {
        return this.http.get<UserDto>(apiSettings.baseUrl + this.urls.getUserInfo);
    }

    updateUserInfo(dto: UserDto): Observable<any> {
        return this.http.post(apiSettings.baseUrl + this.urls.updateUserInfo, dto, { responseType: "text" });
    }

    updateMainUserInfo(dto: UserMainInfoDto): Observable<any> {
        return this.http.put(apiSettings.baseUrl + this.urls.updateMainUserInfo, dto, { responseType: "text" });
    }

    updatePersonalUserInfo(dto: UserPersonalInfoDto): Observable<any> {
        return this.http.patch(apiSettings.baseUrl + this.urls.updateMainUserInfo, dto, { responseType: "text" });
    }

    uploadAvatar(avatar: File): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        const formData = new FormData();
        formData.append('avatar', avatar, avatar.name);
        return this.http.post(apiSettings.baseUrl + this.urls.uploadAvatar, formData, { headers: headers, responseType: 'text' });
    }
}