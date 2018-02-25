import { Injectable, Component } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class SoSnackService {
    constructor(public snackBar: MatSnackBar) { }

    showGeneral(message: string, action: string | undefined): Observable<MatSnackBarDismiss> {
        return this.core(message, action, 3000, []);
    }

    showError(message: string, action: string | undefined, duration: number = 5000): Observable<MatSnackBarDismiss> {
        return this.core(message, action, duration, ['so-error-snackbar']);
    }

    showSuccess(message: string, action: string | undefined, duration: number = 5000): Observable<MatSnackBarDismiss> {
        return this.core(message, action, 500000, ['so-success-snackbar']);
    }

    core(message: string, action: string = "OK", duration: number = 3000, extraClasses: string[]) {
        const config: MatSnackBarConfig = {
            duration: duration,
            panelClass: extraClasses
        };
        const ref = this.snackBar.open(message, action, config);
        return ref.afterDismissed();
    }
}