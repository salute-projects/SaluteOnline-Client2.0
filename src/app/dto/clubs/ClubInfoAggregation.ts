import { ClubStatus } from "../enums";

export class ClubInfoAggregation {
    count: number;
    isFiim: number;
    byStatus: Map<ClubStatus, number>;
    geography: Map<string, Array<string>>;
}