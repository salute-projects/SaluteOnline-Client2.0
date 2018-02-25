import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../services/global.state';
import { HubConnection, HttpClient } from "@aspnet/signalr-client";
import { resetFakeAsyncZone } from '@angular/core/testing';
import { HubService } from '../../services/hub.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShellComponent {

  private hubConnection: HubConnection;

  isMenuCollapsed = false;

  constructor(private readonly state: GlobalState, private readonly auth: AuthenticationService, private readonly hub: HubService) {
    this.state.subscribe(this.state.events.menu.isCollapsed, (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.auth.isAuthenticated().subscribe(result => {
      console.log(result);
      if (result) {
        var token = this.auth.getToken();
      this.hub.start(token);
      }
    })
  }

  getLeftMargin() {
    return this.isMenuCollapsed ? '52px' : '180px';
  }

}