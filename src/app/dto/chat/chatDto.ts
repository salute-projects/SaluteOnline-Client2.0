import { ChatMemberDto } from "./chatMemberDto";

export class ChatDto {
    guid: string;
    created: Date;
    lastUpdated: Date;
    participants: Array<ChatMemberDto>;
    isPrivate: boolean;
    title: string;
    avatar: string;
    newMessages: number;
}