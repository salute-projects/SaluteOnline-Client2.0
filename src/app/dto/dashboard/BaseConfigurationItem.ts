export class BaseConfigurationItem {
    constructor(cols: number, rows: number, y: number, x: number, resizeEnabled: boolean, dragEnabled: boolean, hasContent: boolean) {
        this.hasContent = hasContent;
        this.dragEnabled = dragEnabled;
        this.resizeEnabled = resizeEnabled;
        this.cols = cols;
        this.rows = rows;
        this.y = y;
        this.x = x;

    }
    
    hasContent: boolean;
    dragEnabled: boolean;
    resizeEnabled: boolean;
    cols: number;
    rows: number;
    x: number;
    y: number;
}