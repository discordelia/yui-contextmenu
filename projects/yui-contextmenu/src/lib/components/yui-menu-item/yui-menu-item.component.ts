import { Component, OnInit, ContentChildren, QueryList, Input, Output, EventEmitter, TemplateRef } from "@angular/core";
import { IMenuItem } from "../../interfaces/IMenuItem";
import { IExtendedMenuItem } from "../../interfaces/IExtendedMenuItem";

@Component({
    selector: "yui-menu-item",
    templateUrl: "./yui-menu-item.component.html",
    styleUrls: ["./yui-menu-item.component.scss"]
})
export class YuiMenuItemComponent implements OnInit {

    private menuItem: IExtendedMenuItem = {};
    @ContentChildren(YuiMenuItemComponent) submenuItems: QueryList<YuiMenuItemComponent>;

    @Input() set disabled(disabled: boolean) {
        this.menuItem.disabled = disabled;
    }

    @Input() set divider(divider: boolean) {
        this.menuItem.divider = divider;
    }

    @Input() set icon(icon: string) {
        this.menuItem.icon = icon;
    }

    @Input() set iconTemplate(template: TemplateRef<any>) {
        this.menuItem.iconTemplate = template;
    }

    @Input() set image(image: string) {
        this.menuItem.image = image;
    }

    @Input() set text(text: string) {
        this.menuItem.text = text;
    }

    @Input() set textTemplate(template: TemplateRef<any>) {
        this.menuItem.textTemplate = template;
    }

    @Input() set toggleable(toggleable: boolean) {
        this.menuItem.toggleable = toggleable;
    }

    @Input() set toggled(toggled: boolean) {
        this.menuItem.toggled = toggled;
    }

    @Input() set visible(visible: boolean) {
        this.menuItem.visible = visible;
    }

    @Output() select: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();
    @Output() toggledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public constructor() {
    }

    ngOnInit(): void {
    }

    public getMenuItemData(): IExtendedMenuItem {
        this.menuItem.selectEmitter = this.select;
        this.menuItem.toggleEmitter = this.toggledChange;
        this.menuItem.menuItems = this.submenuItems.map(i => i.getMenuItemData());
        return this.menuItem;
    }

}
