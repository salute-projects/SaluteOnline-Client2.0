import { EntityType } from "../enums";

export class ChatMemberDto {
    id: number;
    type: EntityType;
    title: string;
}