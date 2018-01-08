import { Injector, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable } from 'rxjs';
import { InnerMessagesFilter, InnerMessageDto } from "../../dto/innerMessage/index";
import { Page } from "../../dto/common/index";

@Injectable()
export class InnerMessageApi {
    urls: any = {
        getMessages: 'innerMessages'
    }

    constructor(private readonly http: HttpClient) {
    }

    getMessages(filter: InnerMessagesFilter): Observable<Page<InnerMessageDto>> {
        return this.http.post<Page<InnerMessageDto>>(apiSettings.baseUrl + this.urls.getMessages, filter);
    }
}