import { Component, Inject, ViewEncapsulation, Input } from "@angular/core";


@Component({
    selector: 'so-spinner',
    templateUrl: 'so-spinner.html',
    styleUrls: ['./so-spinner.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SoSpinner {
    constructor() {
    }

    @Input('isEnabled')
    isLoadingResults: boolean = false;
}