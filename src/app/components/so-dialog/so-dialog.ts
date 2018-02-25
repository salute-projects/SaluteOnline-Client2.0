import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ViewEncapsulation } from "@angular/core/src/metadata/view";


@Component({
    selector: 'so-dialog',
    templateUrl: 'so-dialog.html',
    styleUrls: ['./so-dialog.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SoDialog {
    constructor(public dialogRef: MatDialogRef<SoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onOk(): void {
        this.dialogRef.close(true);
    }
}