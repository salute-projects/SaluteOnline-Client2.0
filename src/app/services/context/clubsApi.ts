﻿import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable } from 'rxjs';
import { CreateClubDto, ClubFilter, ClubSummaryDto, ClubInfoAggregation, ClubDto, ClubMemberSummary, 
    ClubMemberFilter, CreateClubMemberDto, MembershipRequestCreateDto, MembershipRequestFilter, MembershipRequestDto, 
    HandleMembershipRequestDto, ClubAdministrationSummaryDto, ClubChangeStatusRequest } from "../../dto/clubs/index";
import { Page } from "../../dto/common/index";
import { Helpers } from "../helpers";

@Injectable()
export class ClubsApi {
    urls: any = {
        createClub: 'clubs',
        getList: 'clubs/list',
        getMyClubs: 'clubs/myList',
        getClubInfoAggregation: 'clubs',
        getClubInfo: 'clubs/',
        getClubAdministrators: 'clubs/admins',
        getClubMembers: 'clubs/members',
        addClubMember: 'clubs/addClubMember',
        addMembershipRequest: 'clubs/addMembershipRequest',
        getMembershipRequests: 'clubs/getMembershipRequests',
        handleMembershipRequest: 'clubs/handleMembershipRequest',
        canRegisterClub: 'clubs/canRegisterClub',
        changeAvatar: 'clubs/changeAvatar'
    }

    constructor(private readonly http: HttpClient, private readonly helpers: Helpers) {
    }

    createClub(dto: CreateClubDto): Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.createClub, dto, { responseType: "text" });
    }

    getList(dto: ClubFilter): Observable<Page<ClubSummaryDto>> {
        return this.http.post<Page<ClubSummaryDto>>(apiSettings.baseUrl + this.urls.getList, dto);
    }

    getMyClubs(): Observable<ClubSummaryDto[]> {
        return this.http.get<ClubSummaryDto[]>(apiSettings.baseUrl + this.urls.getMyClubs);
    }

    getClubInfoAggregation(): Observable<ClubInfoAggregation> {
        return this.http.get<ClubInfoAggregation>(apiSettings.baseUrl + this.urls.getClubInfoAggregation);
    }

    getClubInfo(id: number): Observable<ClubDto> {
        return this.http.get<ClubDto>(apiSettings.baseUrl + this.urls.getClubInfo + id);
    }

    getClubAdministrators(filter: ClubMemberFilter): Observable<Page<ClubMemberSummary>> {
        return this.http.post<Page<ClubMemberSummary>>(apiSettings.baseUrl + this.urls.getClubAdministrators, filter);
    }

    getClubMembers(filter: ClubMemberFilter): Observable<Page<ClubMemberSummary>> {
        return this.http.post<Page<ClubMemberSummary>>(apiSettings.baseUrl + this.urls.getClubMembers, filter);
    }

    addClubMember(member: CreateClubMemberDto): Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.addClubMember, member, { responseType: "text" });
    }

    addMembershipRequest(dto: MembershipRequestCreateDto): Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.addMembershipRequest, dto, { responseType: "text" });
    }

    getMembershipRequests(filter: MembershipRequestFilter): Observable<Page<MembershipRequestDto>> {
        return this.http.post<Page<MembershipRequestDto>>(apiSettings.baseUrl + this.urls.getMembershipRequests, filter);
    }

    handleMembershipRequest(dto: HandleMembershipRequestDto): Observable<any> {
        return this.http.post(apiSettings.baseUrl + this.urls.handleMembershipRequest, dto, { responseType: "text" });
    }

    canRegisterClub() : Observable<boolean> {
        return this.http.get<boolean>(apiSettings.baseUrl + this.urls.canRegisterClub);
    }

    changeAvatar(avatar: File, id: number): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        const formData = new FormData();
        formData.append('avatar', avatar, avatar.name);
        return this.http.post(apiSettings.baseUrl + this.urls.changeAvatar + "/" + id, formData, { headers: headers, responseType: 'text' });
    }
}