import { EntityType } from "../enums";

export class ChatMemberDto {
    guid: string;
    type: EntityType;
    title: string;
}