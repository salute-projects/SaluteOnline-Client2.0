import { ClubWidgetType } from "../enums";
import { BootstrapOptions } from "@angular/core/src/application_ref";
import { BaseConfigurationItem } from "./BaseConfigurationItem";
import { GridsterItem } from "angular-gridster2";

export class ClubDashboardConfigurationItem extends BaseConfigurationItem implements GridsterItem {
    constructor(cols: number, rows: number, y: number, x: number, resizeEnabled: boolean, dragEnabled: boolean, hasContent: boolean, clubWidgetType: ClubWidgetType) {
        super(cols, rows, y, x, resizeEnabled, dragEnabled, hasContent);
        this.clubWidgetType = clubWidgetType;
    }

    clubWidgetType: ClubWidgetType;
}