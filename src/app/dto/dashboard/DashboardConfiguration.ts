import { DashboardConfigurationItem } from "./DashboardConfigurationItem";

export class DashboardConfiguration {
    guid: string;
    id: number;
    lastChanged: Date;
    panels: Array<DashboardConfigurationItem>;
}