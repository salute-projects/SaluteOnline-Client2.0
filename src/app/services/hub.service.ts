import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HubConnection, HttpClient } from "@aspnet/signalr-client";
import { apiSettings } from "../configuration/constants";
import { GlobalState } from "./global.state";
import { stagger } from "@angular/core/src/animation/dsl";
import { LogLevel } from "@aspnet/signalr-client/dist/src/ILogger";

@Injectable()
export class HubService {
    private hubConnection: HubConnection;
    
    methods = {
        newMessage: 'newMessage'
    }

    constructor(private readonly state: GlobalState) {
    }

    start(token: string) {
        this.hubConnection = new HubConnection(apiSettings.messageHub + '?Bearer=' + token.replace('Bearer ', ''), {
            logging: LogLevel.None
        });
        this.hubConnection.start().then(() => {
            this.hubConnection.on(this.methods.newMessage, (message: string, sent: Date) => {
            });
          });
    }
}