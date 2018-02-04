import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalState } from "../../services/global.state";
import { Context } from "../../services/context/context";
import { MatDialog, MatDialogConfig} from "@angular/material";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { systemAvatar } from "../../configuration/constants";
import { MessageStatus, EntityType } from "../../dto/enums";
import { ChatMessageDto } from "../../dto/chat/index";
import { AuthenticationService } from "../../services/authentication.service";

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

    constructor(private readonly state: GlobalState, private readonly router: Router, public loginDialog: MatDialog,
        private readonly sanitizer: DomSanitizer, private readonly context: Context, private readonly authenticationService: AuthenticationService ) {
        this.authenticationService.isAuthenticated().subscribe(result => {
            this.logged = result;
            this.loadMessages();
        })
        this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem('avatar') || '');
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

    login() {
        this.authenticationService.login();
    }

    logout() {
        this.authenticationService.logoff();
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