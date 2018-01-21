import { EntityType } from "../enums";

export class PostPrivateMessageDto {
    senderId: number;
    senderType: EntityType;
    receiverId: number;
    receiverType: EntityType;
    message: string;
}