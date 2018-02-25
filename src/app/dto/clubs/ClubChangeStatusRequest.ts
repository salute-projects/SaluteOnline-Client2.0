import { ClubStatus } from "../enums";

export class ClubChangeStatusRequest {
    clubId: number;
    status: ClubStatus;
}