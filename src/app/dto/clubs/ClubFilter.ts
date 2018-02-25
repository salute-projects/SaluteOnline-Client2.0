import { BaseFilter } from "../common";
import { ClubStatus } from "../enums";

export class ClubFilter extends BaseFilter {

    constructor() {
        super();
        this.title = "";
        this.asc = false;
        this.city = "";
        this.creatorId = null;
        this.status = ClubStatus.ActiveAndPending;
        this.page = 1;
        this.pageSize = 25;
        this.orderBy = "";
    }

    title: string | null;
    country: string | null;
    city: string | null;
    creatorId: number | null;
    status: ClubStatus;
}