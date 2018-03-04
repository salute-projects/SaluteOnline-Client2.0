import { ClubStatus } from "../enums";

export class ClubInfoAggregation {
    count: number;
    byStatus: Map<ClubStatus, number>;
    //geography: Map<string, Array<string>>;
    geography: Array<{ key: string, value: Array<string> }>;
} 