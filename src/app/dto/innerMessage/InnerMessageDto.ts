import { EntityType, MessageStatus } from "../enums";

export class InnerMessageDto {
    id: number;
    senderId: number | null;
    senderType: EntityType;
    receiverId: number | null;
    receiver: EntityType;
    status: MessageStatus;
    title: string;
    body: string;
    created: Date;
    lastActivity: Date;
    sentBySystem: boolean;
    oneResponseForAll: boolean;
    avatar: string;
    senderName: string;
}