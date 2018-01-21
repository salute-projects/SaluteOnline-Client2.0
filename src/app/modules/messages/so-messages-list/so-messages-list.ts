import { Component, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Page } from "../../../dto/common";
import { SoSnackService } from "../../../services/snack.service";
import { Context } from "../../../services/context/context";
import { systemAvatar } from "../../../configuration/constants";
import { MessageStatus, EntityType } from "../../../dto/enums";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { ChatDto, ChatMessageDto } from "../../../dto/chat/index";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "so-messages",
    styleUrls: ["./so-messages-list.scss"],
    templateUrl: "./so-messages-list.html",
    encapsulation: ViewEncapsulation.None
})

export class SoMessagesList {
    guid: string;
    chats = new Array<ChatDto>();
    messages = new Page<ChatMessageDto>();

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly sanitizer: DomSanitizer, 
        private readonly route: ActivatedRoute, private readonly router: Router) {

        this.route.params.subscribe(params => {
            this.guid = params['guid'];
            this.context.chatApi.getChats().subscribe(result => {
                this.chats = result;
                if (result.length > 0 && !this.guid) {
                    this.router.navigateByUrl('/messages/' + result[0].guid)
                } else {
                    this.context.chatApi.getChatMessages(this.guid, 0, 25).subscribe(res => {
                        this.messages = res;
                    }, error => {
                        this.snackService.showError(error.error, 'OK');
                    })
                }
            }, error => {
                this.snackService.showError(error.error, 'OK');
            })
            
        });
    }

    getAvatar(avatar: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(avatar ? `data:image/jpg;base64,${avatar}` : systemAvatar);
    }
}