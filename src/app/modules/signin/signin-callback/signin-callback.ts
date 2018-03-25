import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

@Component({
    selector: 'signin-callback',
    templateUrl: './signin-callback.html'
})

export class SigninCallbackComponent implements OnInit {
    ngOnInit(): void {
        debugger;
        this.router.navigate(['../dashboard']);
    }

    constructor(private router: Router) {
    }
}