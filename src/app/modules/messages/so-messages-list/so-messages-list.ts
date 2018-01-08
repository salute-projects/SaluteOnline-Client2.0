import { Component, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Page } from "../../../dto/common";
import { SoSnackService } from "../../../services/snack.service";
import { Context } from "../../../services/context/context";
import { systemAvatar } from "../../../configuration/constants";
import { InnerMessageDto, InnerMessagesFilter } from "../../../dto/innerMessage/index";
import { MessageStatus, EntityType } from "../../../dto/enums";

@Component({
    selector: "so-messages",
    styleUrls: ["./so-messages-list.scss"],
    templateUrl: "./so-messages-list.html",
    encapsulation: ViewEncapsulation.None
})

export class SoMessagesList {
    messages = new Page<InnerMessageDto>();

    constructor(private readonly context: Context, private readonly snackService: SoSnackService, private readonly sanitizer: DomSanitizer) {
        const filter = new InnerMessagesFilter(EntityType.User, null, MessageStatus.Pending);
        this.context.innerMessageApi.getMessages(filter).subscribe(result => {
            this.messages = result;
        }, error => {
            this.snackService.showError(error.error, 'OK');
        });
    }

    getAvatar(avatar: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(avatar ? `data:image/jpg;base64,${avatar}` : systemAvatar);
    }
}