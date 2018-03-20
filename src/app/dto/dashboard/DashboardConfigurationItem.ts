import { WidgetType } from "../enums";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { GridsterItem } from "angular-gridster2";
import { BaseConfigurationItem } from "./BaseConfigurationItem";

export class DashboardConfigurationItem extends BaseConfigurationItem implements GridsterItem {

    constructor(cols: number, rows: number, y: number, x: number, resizeEnabled: boolean, dragEnabled: boolean, hasContent: boolean, widgetType: WidgetType) {
        super(cols, rows, y, x, resizeEnabled, dragEnabled, hasContent);
        this.widgetType = widgetType;
    }

    widgetType: WidgetType;
}