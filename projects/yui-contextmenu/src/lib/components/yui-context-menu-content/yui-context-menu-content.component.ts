import {Component, Input, HostBinding, HostListener, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy} from "@angular/core";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";
import {ContextMenuService} from "../../services/context-menu.service";
import {IMenuItemContextMenuRefPair} from "../../interfaces/IMenuItemContextMenuRefPair";
import {IExtendedMenuItem} from "../../interfaces/IExtendedMenuItem";
import {YuiContextMenuItemComponent} from "../yui-context-menu-item/yui-context-menu-item.component";
import {Subscription} from "rxjs";
import {KeyStringValue} from "../../enums/KeyStringValue";
import {IMenuChangeEvent} from "../../interfaces/IMenuChangeEvent";

@Component({
    selector: "yui-contextmenu-content",
    templateUrl: "./yui-context-menu-content.component.html",
    styleUrls: ["./yui-context-menu-content.component.scss"]
})
export class YuiContextMenuContentComponent implements AfterViewInit, OnDestroy {

    private keyManager: ActiveDescendantKeyManager<YuiContextMenuItemComponent>;
    private menuCloseSubscription$: Subscription;
    private previousMenuItem: IExtendedMenuItem = null;
    @Input() changeCallback: (data: IMenuChangeEvent) => void;
    @Input() depth: number = 0;
    @Input() menuClass: string;
    @Input() menuItems: IExtendedMenuItem[] = [];
    @Input() parentMenuItem: IExtendedMenuItem = null;
    @Input() rootMenuId: number;
    @ViewChildren(YuiContextMenuItemComponent) menuItemComponents: QueryList<YuiContextMenuItemComponent>;

    public constructor(
        private contextMenuService: ContextMenuService,
        private elementRef: ElementRef
    ) {
    }

    ngAfterViewInit(): void {
        this.keyManager = new ActiveDescendantKeyManager(this.menuItemComponents).withWrap().skipPredicate(item => item.menuItem?.disabled || item.menuItem?.divider);
        window.setTimeout(() => {
            ((this.elementRef.nativeElement as HTMLElement).querySelector("ul:first-child") as HTMLElement).focus();
        });
        this.menuCloseSubscription$ = this.contextMenuService.MenuCloseSubject$.subscribe((depth: number) => {
            if (depth === this.depth) {
                window.setTimeout(() => {
                    ((this.elementRef.nativeElement as HTMLElement).querySelector("ul:first-child") as HTMLElement).focus();
                });
            }
        });
        if (this.depth > 1 && this.contextMenuService.SubmenuCreatedViaKeyboard) {
            window.setTimeout(() => {
                const firstEnabledMenuItemIndex = this.menuItems.findIndex(item => !item.disabled);
                if (firstEnabledMenuItemIndex !== -1) {
                    this.menuItems[firstEnabledMenuItemIndex].focused = true;
                    this.keyManager.setActiveItem(firstEnabledMenuItemIndex);
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.menuCloseSubscription$.unsubscribe();
    }

    public onMenuItemHovered(event: IMenuItemContextMenuRefPair): void {
        if (event.menuItem.disabled) {
            if (this.previousMenuItem) {
                this.previousMenuItem.focused = false;
                this.contextMenuService.removeMenuViaDepth(this.depth, this.rootMenuId);
                this.keyManager.setActiveItem(null);
                // this.changeCallback({item: event.menuItem, depth: this.depth});
            }
            return;
        }
        if (!this.previousMenuItem) {
            this.contextMenuService.removeMenuViaDepth(this.depth, this.rootMenuId);
            this.previousMenuItem = event.menuItem;
            this.previousMenuItem.focused = !this.previousMenuItem.disabled;
            this.keyManager.setActiveItem(this.menuItemComponents.find(i => i.menuItem === this.previousMenuItem));
            if (this.previousMenuItem?.menuItems?.length > 0) {
                // this.changeCallback({item: event.menuItem, depth: this.depth});
            }
            return;
        }
        if (this.previousMenuItem.menuItems?.length > 0) {
            this.contextMenuService.removeMenuViaDepth(this.depth, this.rootMenuId);
            // this.changeCallback({ item: event.menuItem, depth: this.depth });
        }
        if (this.previousMenuItem !== event.menuItem) {
            this.previousMenuItem.focused = false;
        }
        this.previousMenuItem = event.menuItem;
        this.keyManager.setActiveItem(this.menuItemComponents.find(i => i.menuItem === this.previousMenuItem));
        // this.changeCallback({item: event.menuItem, depth: this.depth});
    }

    @HostListener("window:keydown", ["$event"])
    public onKeydown(event: KeyboardEvent): void {
        if (this.depth !== this.contextMenuService.CurrentDepth) {
            return;
        }
        if (!this.keyManager.activeItem
            && !this.menuItemComponents.toArray().every(item => item.menuItem.disabled)) {
            this.keyManager.onKeydown(event);
            this.changeCallback({item: this.keyManager.activeItem.menuItem, depth: this.depth});
            return;
        }
        switch (event.key) {
            case KeyStringValue.Enter:
            case KeyStringValue.Space:
                this.keyManager.activeItem.onMenuItemSelected(event, this.keyManager.activeItem.menuItem);
                break;
            case KeyStringValue.RightArrow:
                if (!(this.keyManager.activeItem.menuItem.menuItems?.length > 0)) {
                    return;
                }
                this.parentMenuItem = this.keyManager.activeItem.menuItem;
                this.keyManager.activeItem.createSubmenu(
                    this.keyManager.activeItem.hostElementRef.nativeElement as Element,
                    this.keyManager.activeItem.menuItem, true);
                this.changeCallback({
                    item: this.keyManager.activeItem.menuItem.menuItems?.find(mi => !mi.disabled && !mi.divider) ?? null,
                    depth: this.depth + 1
                });
                break;
            case KeyStringValue.LeftArrow:
                if (this.depth > 1) {
                    this.contextMenuService.removeMenuViaDepth(this.depth - 1, this.rootMenuId);
                    this.changeCallback({
                        item: this.parentMenuItem,
                        depth: this.depth - 1
                    });
                }
                break;
            case KeyStringValue.DownArrow:
            case KeyStringValue.UpArrow:
                this.keyManager.onKeydown(event);
                this.changeCallback({item: this.keyManager.activeItem.menuItem, depth: this.depth});
                break;
            default:
                this.keyManager.onKeydown(event);
                break;
        }
        if (this.keyManager.activeItem) {
            this.previousMenuItem = this.keyManager.activeItem.menuItem;
        }
    }
}
