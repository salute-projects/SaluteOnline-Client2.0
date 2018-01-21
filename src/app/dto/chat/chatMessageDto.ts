import { EntityType } from "../enums";

export class ChatMessageDto {
    guid: string;
    message: string;
    sent: Date;
    senderId: number;
    senderType: EntityType;
    seen: boolean;
    my: boolean;
    avatar: string;
}