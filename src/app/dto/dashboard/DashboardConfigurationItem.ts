import { WidgetType } from "../enums";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { GridsterItem } from "angular-gridster2";

export class DashboardConfigurationItem implements GridsterItem {

    constructor(cols: number, rows: number, y: number, x: number, resizeEnabled: boolean, dragEnabled: boolean, hasContent: boolean, widgetType: WidgetType) {
        this.widgetType = widgetType;
        this.hasContent = hasContent;
        this.dragEnabled = dragEnabled;
        this.resizeEnabled = resizeEnabled;
        this.cols = cols;
        this.rows = rows;
        this.y = y;
        this.x = x;

    }

    widgetType: WidgetType;
    hasContent: boolean;
    dragEnabled: boolean;
    resizeEnabled: boolean;
    cols: number;
    rows: number;
    y: number;
    x: number;
}