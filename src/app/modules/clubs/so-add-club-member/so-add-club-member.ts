import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from 'rxjs/Observable';
import { SoSnackService } from "../../../services/snack.service";
import { Context } from "../../../services/context/context";
import { Helpers } from "../../../services/helpers";
import { CreateClubMemberDto } from "../../../dto/club";

@Component({
    selector: "so-add-club-member",
    templateUrl: "./so-add-club-member.html",
    encapsulation: ViewEncapsulation.None,
    providers: [SoSnackService]
})

export class AddClubMemberDialog {
    createClubMember: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddClubMemberDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private readonly fb: FormBuilder, private readonly snackService: SoSnackService,
        private readonly context: Context, private readonly helpers: Helpers) {
        this.createForm();
    }

    private createForm() {
        this.createClubMember = this.fb.group({
            nickname: ['', Validators.required]
        });
    }

    addMember() {
        const args = new CreateClubMemberDto();
        args.clubId = this.data.clubId;
        const nickname = this.createClubMember.get('nickname');
        args.nickname = nickname ? nickname.value : '';
        this.context.clubsApi.addClubMember(args).subscribe((result: any) => {
            this.dialogRef.close(result);
        }, error => {
            this.snackService.showError(error.error, 'OK', undefined);
        });
    }
}