import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../services/global.state';
import { AuthService } from '../../services/auth';
import { HubConnection, HttpClient } from "@aspnet/signalr-client";
import { resetFakeAsyncZone } from '@angular/core/testing';
import { HubService } from '../../services/hub.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShellComponent {

  private hubConnection: HubConnection;

  isMenuCollapsed = false;

  constructor(private readonly state: GlobalState, private readonly auth: AuthService, private readonly hub: HubService) {
    this.state.subscribe(this.state.events.menu.isCollapsed, (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
    if (this.auth.isAuthenticated()) {
      var token = this.auth.tryGetToken();
      this.hub.start(token);
    } else {
      this.auth.refreshToken().subscribe(result => {
        if (result.token) {
          this.hub.start(result.token);
        }
      })
    }
  }

  private getLeftMargin() {
    return this.isMenuCollapsed ? '52px' : '180px';
  }

}