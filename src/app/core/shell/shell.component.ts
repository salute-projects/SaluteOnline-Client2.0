import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../services/global.state';
import { AuthService } from '../../services/auth';
import { HubConnection, HttpClient } from "@aspnet/signalr-client";
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShellComponent implements OnInit {

  private hubConnection: HubConnection;

  isMenuCollapsed = false;

  constructor(private readonly state: GlobalState, private readonly auth: AuthService) {
    this.state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
    if (this.auth.isAuthenticated()) {
      var token = this.auth.tryGetToken();
      this.hubConnection = new HubConnection("http://localhost:5134/soMessageHub?Bearer=" + token.replace('Bearer ', ''));
      this.startHub();
    } else {
      this.auth.refreshToken().subscribe(result => {
        if (result.token) {
          this.hubConnection = new HubConnection("http://localhost:5134/soMessageHub?Bearer=" + result.token);
          this.startHub();
        }
      })
    }
  }

  private startHub(): void {
    this.hubConnection.start().then(() => {
      this.hubConnection.on('newMessage', (message: string, sent: Date) => {
        debugger;
      });
    });
  }

  ngOnInit() { 
  }

}