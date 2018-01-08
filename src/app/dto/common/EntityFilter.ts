import { BaseFilter } from "./BaseFilter";

export class EntityFilter extends BaseFilter {
    constructor(id: number) {
        super();
        this.entityId = id;
        this.asc = false;
        this.searchBy = '';
        this.page = 1;
        this.pageSize = 25;
        this.orderBy = "";
    }

    entityId: number | null;
    searchBy: string;
}