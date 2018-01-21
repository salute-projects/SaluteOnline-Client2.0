import { Injector, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { apiSettings } from "../../configuration/constants";
import { Observable } from 'rxjs';
import { Page } from "../../dto/common/index";
import { ChatDto, PostPrivateMessageDto, ChatMessageDto } from "../../dto/chat/index";

@Injectable()
export class ChatApi {
    urls: any = {
        getChats: 'chat/',
        postMessage: 'chat/',
        getLatest: 'chat/latest/',
        getChatMessages: 'chat/'
    }

    constructor(private readonly http: HttpClient) {
    }

    getChats(): Observable<Array<ChatDto>> {
        return this.http.get<Array<ChatDto>>(apiSettings.baseUrl + this.urls.getChats);
    }

    postMessage(message: PostPrivateMessageDto): Observable<string> {
        return this.http.post(apiSettings.baseUrl + this.urls.postMessage, message, { responseType: "text" });
    }

    getLatest(take: number) : Observable<Array<ChatMessageDto>> {
        return this.http.get<Array<ChatMessageDto>>(apiSettings.baseUrl + this.urls.getLatest + take);
    }

    getChatMessages(guid: string, page: number, pageSize: number) : Observable<Page<ChatMessageDto>> {
        return this.http.get<Page<ChatMessageDto>>(apiSettings.baseUrl + this.urls.getChatMessages + guid + '/' + page + '/' + pageSize);
    }
}