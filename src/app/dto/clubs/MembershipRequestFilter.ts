import { EntityFilter } from "../common";
import { MembershipRequestStatus } from "../enums";

export class MembershipRequestFilter extends EntityFilter {
    constructor(id: number) {
        super(id);
        this.entityId = id;
        this.asc = false;
        this.searchBy = '';
        this.page = 1;
        this.pageSize = 25;
        this.orderBy = "";
        this.status = MembershipRequestStatus.Pending;
    }

    entityId: number | null;
    searchBy: string;
    status: MembershipRequestStatus;
}