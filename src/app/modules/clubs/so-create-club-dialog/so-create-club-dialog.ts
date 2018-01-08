import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from 'rxjs/Observable';
import { SoSnackService } from "../../../services/snack.service";
import { Country } from "../../../dto/common";
import { Context } from "../../../services/context/context";
import { Helpers } from "../../../services/helpers";
import { CreateClubDto } from "../../../dto/clubs/index";

@Component({
    selector: "so-create-club-dialog",
    templateUrl: "./so-create-club-dialog.html",
    encapsulation: ViewEncapsulation.None,
    providers: [SoSnackService]
})

export class CreateClubDialog {
    createClubForm: FormGroup;
    allCountries: Country[];
    filteredCountries: Observable<Country[]>;

    constructor(public dialogRef: MatDialogRef<CreateClubDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private readonly fb: FormBuilder, private readonly snackService: SoSnackService,
        private readonly context: Context, private readonly helpers: Helpers) {
        this.createForm();
        this.context.commonApi.getCountries().subscribe(result => {
            this.allCountries = result;
            this.filteredCountries = (this.createClubForm.controls['country'] as FormControl).valueChanges.startWith(null)
                .map((country: string) => country ? this.filterCountries(country) : this.allCountries.slice());
        }, () => {
            this.filteredCountries = Observable.from([]);
        });
    }

    private createForm() {
        this.createClubForm = this.fb.group({
            title: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            description: ''
        });
    }

    private filterCountries(country: string) {
        return this.allCountries.filter(state => state.name.toLowerCase().indexOf(country.toLowerCase()) === 0);
    }

    createClub() {
        const args = this.helpers.formToObject(this.createClubForm, new CreateClubDto());
        this.context.clubsApi.createClub(args).subscribe((result: any) => {
            this.dialogRef.close(result);
        }, error => {
            this.snackService.showError(error.error, 'OK', undefined);
        });
    }
}