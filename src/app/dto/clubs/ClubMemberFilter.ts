import { BaseFilter } from "../common";

export class ClubMemberFilter extends BaseFilter {
    constructor(clubId: number) {
        super();
        this.pageSize = 25;
        this.asc = false;
        this.clubId = clubId;
        this.page = 1;
        this.search = '';
    }

    search: string;
    clubId: number;
}