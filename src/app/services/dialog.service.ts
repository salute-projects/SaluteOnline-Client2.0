import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { SoDialog } from "../components/so-dialog/so-dialog";
import { Observable } from "@aspnet/signalr-client/dist/src/Observable";



@Injectable()
export class SoDialogService {
    constructor(public dialog: MatDialog) { }

    open(title: string, content: string, okButton: string = 'OK', cancelButton: string = 'CANCEL') {
        let dialogRef = this.dialog.open(SoDialog, {
            width: '350px',
            panelClass: 'generic-gialog',
            data: {
                title: title,
                content: content,
                okButton: okButton,
                cancelButton: cancelButton
            }
        });
        return dialogRef.afterClosed();
    }
}