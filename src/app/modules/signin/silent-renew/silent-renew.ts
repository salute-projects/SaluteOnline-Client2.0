import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

@Component({
    selector: 'silent-renew',
    templateUrl: './silent-renew.html'
})

export class SilentRenewComponent {
    
    constructor(private router: Router) {
        debugger;
    }
}