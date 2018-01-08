import { BaseFilter } from "../common/BaseFilter";
import { EntityType, MessageStatus } from "../enums";

export class InnerMessagesFilter extends BaseFilter {
    constructor(type: EntityType, id: number | null, status: MessageStatus) {
        super();
        this.receiverType = type;
        this.receiverId = id;
        this.status = status;
    }

    receiverId: number | null;
    receiverType: EntityType;
    status: MessageStatus;
}