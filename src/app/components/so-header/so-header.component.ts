import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalState } from "../../services/global.state";
import { AuthService } from "../../services/auth";
import { Context } from "../../services/context/context";
import { MatDialog, MatDialogConfig} from "@angular/material";
import { LoginDialog } from "../so-login-dialog/so-login-dialog";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { systemAvatar } from "../../configuration/constants";
import { MessageStatus, EntityType } from "../../dto/enums";
import { ChatMessageDto } from "../../dto/chat/index";

@Component({
    selector: "so-header",
    styleUrls: ["./so-header.component.scss"],
    templateUrl: "./so-header.component.html",
    encapsulation: ViewEncapsulation.None
})

export class SoHeader {
    avatar: SafeResourceUrl;
    isMenuCollapsed = false;
    logged = false;
    email: string;
    password: string;
    messages : ChatMessageDto[] = [];

    constructor(private readonly state: GlobalState, private readonly router: Router, private readonly authService: AuthService, public loginDialog: MatDialog,
        private readonly sanitizer: DomSanitizer, private readonly context: Context ) {
        this.logged = this.authService.isAuthenticated();
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem('avatar') || '');
        if (this.authService.isAuthenticated()) {
            this.loadMessages();
        }
        this.state.subscribe(this.state.events.menu.isCollapsed, (isCollapsed: boolean) => {
            this.isMenuCollapsed = isCollapsed;
        });
        this.state.subscribe(this.state.events.global.logged, (logged: boolean) => {
            this.logged = logged;
            if (logged) {
                this.loadMessages();
            }
        });
        this.state.subscribe(this.state.events.user.avatarChanged, () => {
            const avatar = localStorage.getItem('avatar') || '';
            this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(avatar);
        });
    }

    private loadMessages() {
        this.context.chatApi.getLatest(3).subscribe(result => {
            this.messages = result;
        }, error => {})
    }

    openDialog(): void {
        const config: MatDialogConfig = {
            width: '400px',
            panelClass: 'custom-dialog',
            data: { email: this.email, password: this.password }
        };
        const dialogRef = this.loginDialog.open(LoginDialog, config);
        dialogRef.afterClosed().subscribe(result => {
            this.logged = result ? true : false;
        }, () => {
            this.logged = false;
        });
    }

    logout() {
        this.authService.logout();
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this.state.notifyDataChanged(this.state.events.menu.isCollapsed, this.isMenuCollapsed);
    }

    gotoUserProfile() {
        this.router.navigateByUrl('/profile');
    }

    getAvatar(avatar: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(avatar ? `data:image/jpg;base64,${avatar}` : systemAvatar);
    }
}