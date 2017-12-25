import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../services/global.state';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  isMenuCollapsed = false;

  constructor(private readonly state: GlobalState, private readonly auth: AuthService) {
    this.state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.auth.refreshToken().subscribe(result => {
    }, error => {});
  }

  ngOnInit() { }

}