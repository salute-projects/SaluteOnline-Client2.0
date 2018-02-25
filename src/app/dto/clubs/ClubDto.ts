import { ClubStatus } from "../enums";

export class ClubDto {
    constructor() {
        this.id = -1;
        this.title = '';
        this.country = '';
        this.registered = '';
        this.lastUpdate = '';
        this.creatorId = -1;
        this.status = ClubStatus.None;
        this.logo = '';
        this.canBeEdited = false;
        this.city = '';
    }

    id: number;
    title: string;
    country: string;
    description: string;
    registered: string;
    lastUpdate: string;
    creatorId: number;
    status: ClubStatus;
    logo: string;
    canBeEdited: boolean;
    city: string;
}