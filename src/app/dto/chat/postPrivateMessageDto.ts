import { EntityType } from "../enums";

export class PostPrivateMessageDto {
    chatGuid: string;
    senderGuid: string;
    senderType: EntityType;
    senderTitle: string;
    
    receiverGuid: string;
    receiverType: EntityType;
    receiverTitle: string;
    
    message: string;
}