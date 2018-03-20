import { ClubDashboardConfigurationItem } from "./ClubDashboardConfigurationItem";

export class ClubDashboardConfiguration {
    guid: string;
    id: number;
    lastChanged: Date;
    clubId: number;
    userGuid: string;
    panels: Array<ClubDashboardConfigurationItem>;
}