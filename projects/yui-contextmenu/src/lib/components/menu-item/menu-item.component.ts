import {Component, OnInit, ContentChildren, QueryList, Input, Output, EventEmitter, TemplateRef} from "@angular/core";
import {IMenuItem} from "../../interfaces/IMenuItem";
import {IExtendedMenuItem} from "../../interfaces/IExtendedMenuItem";
import {ContextMenuService} from "../../services/context-menu.service";

@Component({
    selector: "yui-menu-item",
    templateUrl: "./menu-item.component.html",
    styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnInit {

    private menuItem: IExtendedMenuItem = {
        parentMenuItemId: null,
        menuItemId: ContextMenuService.menuItemIdentifier++
    };
    @ContentChildren(MenuItemComponent) submenuItems: QueryList<MenuItemComponent>;

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

    @Input() set subtext(subtext: string) {
        this.menuItem.subtext = subtext;
    }

    @Input() set subtextTemplate(template: TemplateRef<any>) {
        this.menuItem.subtextTemplate = template;
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

    @Output() menuSelect: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();
    @Output() toggledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public constructor() {
    }

    ngOnInit(): void {
    }

    public getMenuItemData(parentMenuItem?: IExtendedMenuItem): IExtendedMenuItem {
        this.menuItem.selectEmitter = this.menuSelect;
        this.menuItem.toggleEmitter = this.toggledChange;
        this.menuItem.parentMenuItemId = parentMenuItem?.menuItemId ?? null;
        this.menuItem.menuItems = this.submenuItems.map(i => i.getMenuItemData(this.menuItem));
        return this.menuItem;
    }

}
