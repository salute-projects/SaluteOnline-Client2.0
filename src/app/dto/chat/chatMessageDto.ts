import { EntityType } from "../enums";

export class ChatMessageDto {
    guid: string;
    message: string;
    sent: Date;
    sender: string;
    senderType: EntityType;
    seen: boolean;
    my: boolean;
}