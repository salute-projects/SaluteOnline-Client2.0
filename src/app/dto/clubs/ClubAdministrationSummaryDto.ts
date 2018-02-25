import { ClubStatus } from "../enums";

export class ClubAdministrationSummaryDto {
    id: number;
    title: string;
    country: string;
    city: string;
    registered: string;
    creatorId: number;
    creatorUsername: string;
    status: ClubStatus;
    logo: string;
}