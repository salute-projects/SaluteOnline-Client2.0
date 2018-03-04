import { Component, Inject, ViewEncapsulation, Input } from "@angular/core";


@Component({
    selector: 'so-progress-bar',
    templateUrl: 'so-progress-bar.html',
    encapsulation: ViewEncapsulation.None
})
export class SoProgressBar {
    @Input('isEnabled')
    isLoadingResults: boolean = false;
}