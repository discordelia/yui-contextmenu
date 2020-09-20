import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {ContextMenuService} from "../../services/context-menu.service";
import {ICoordinate, IPopupTarget} from "@discordelia/popup";
import {MenuItemComponent} from "../menu-item/menu-item.component";
import {Subscription} from "rxjs";
import {IExtendedMenuItem} from "../../interfaces/IExtendedMenuItem";
import {IContextMenuData} from "../../interfaces/IContextMenuData";
import {IMenuChangeEvent} from "../../interfaces/IMenuChangeEvent";
import {IMenuCloseEvent} from "../../interfaces/IMenuCloseEvent";
import {IMenuOpenEvent} from "../../interfaces/IMenuOpenEvent";

@Component({
    selector: "yui-contextmenu",
    templateUrl: "./context-menu.component.html",
    styleUrls: ["./context-menu.component.scss"]
})
export class ContextMenuComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, OnChanges {

    private menuData: IContextMenuData = null;
    private subMenuItemsSubscription$: Subscription;
    private targetListener: () => void = null;
    private visible: boolean = false;

    public readonly menuId: number = (ContextMenuService.menuIdentifier++);
    public depth: number = 0;
    public contextMenuTheme: string = "light-theme";
    public menuChangeEvent: (menuEventData: IMenuChangeEvent) => void = null;

    @ContentChildren(MenuItemComponent) subMenuItems: QueryList<MenuItemComponent>;
    @Input() event: MouseEvent;
    @Input() menuClass: string;
    @Input() menuItems: IExtendedMenuItem[] = [];
    @Input() precise: boolean = true;
    @Input() target: IPopupTarget;

    @Input() set theme(theme: "dark" | "light") {
        this.contextMenuTheme = theme === "dark" ? "dark-theme" : "light-theme";
    }

    @Input() trigger: string = "contextmenu";
    @Output() menuChange: EventEmitter<IMenuChangeEvent> = new EventEmitter<IMenuChangeEvent>();
    @Output() menuClose: EventEmitter<IMenuCloseEvent> = new EventEmitter<IMenuCloseEvent>();
    @Output() menuOpen: EventEmitter<IMenuOpenEvent> = new EventEmitter<IMenuOpenEvent>();
    @ViewChild(TemplateRef) contextMenuTemplate: TemplateRef<any>;

    public constructor(
        private contextMenuService: ContextMenuService,
        private readonly renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        if (this.menuItems?.length > 0) {
            this.initializeMenuItems(this.menuItems);
        }
        this.menuChangeEvent = (menuEventData: IMenuChangeEvent) => this.menuChange.emit(menuEventData);
    }

    ngOnChanges(changes: SimpleChanges) {
        const targetChanges = changes?.target;
        if (targetChanges && !targetChanges.isFirstChange()
            && targetChanges.currentValue !== targetChanges.previousValue) {
            this.targetListener?.();
            this.createTargetListener();
            window.setTimeout(() => {
                (this.target as HTMLElement).dispatchEvent(this.event);
            });
        }
    }

    ngAfterContentInit(): void {
        if (this.menuItems?.length > 0) {
            return;
        }
        this.createMenuItems();
        this.initializeMenuItems(this.menuItems);
        this.subMenuItemsSubscription$ = this.subMenuItems.changes.subscribe(() => {
            this.createMenuItems();
            this.initializeMenuItems(this.menuItems);
        });
    }

    ngAfterViewInit(): void {
        if (!this.target) {
            return;
        }
        this.createTargetListener();
    }

    ngOnDestroy(): void {
        this.targetListener?.();
        this.contextMenuService.closeMenu(this.menuId);
        this.subMenuItemsSubscription$?.unsubscribe();
    }

    @HostListener("document:auxclick", ["$event"])
    @HostListener("document:contextmenu", ["$event"])
    @HostListener("document:click", ["$event"])
    public onClickedOutside(event: MouseEvent): void {
        const eventTarget = event.target as Element;
        if (!!eventTarget.closest("yui-contextmenu")) {
            return;
        }
        if (this.visible) {
            this.close();
        }
    }

    @HostListener("document:keyup", ["$event"])
    public onEscapePressed(event: KeyboardEvent): void {
        if (event.key === "Escape" && this.visible) {
            this.close();
        }
    }

    private close(): void {
        this.contextMenuService.closeMenu(this.menuId);
        this.visible = false;
        this.menuClose.emit({
            contextMenuRef: this.menuData.contextMenuRef,
            depth: this.menuData.depth,
            menuId: this.menuData.menuId,
            rootMenuId: this.menuData.rootMenuId
        });
    }

    private createMenuItems(): void {
        if (!this.menuItems || this.menuItems.length === 0) {
            this.menuItems = this.subMenuItems.map(smi => smi.getMenuItemData() as IExtendedMenuItem);
        }
    }

    private createTargetListener(): void {
        this.targetListener = this.renderer.listen(this.target, this.trigger, (event: MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();
            this.contextMenuService.closeAll();

            const target = this.precise ? {x: event.x, y: event.y} as ICoordinate : this.target;
            const contextMenuRef = this.contextMenuService.createContextMenu(target, this.contextMenuTemplate, false);

            this.menuData = {contextMenuRef, depth: this.depth, menuId: this.menuId, rootMenuId: null, isSubmenu: false};
            this.contextMenuService.addActiveMenu(this.menuData);
            this.menuOpen.emit({
                contextMenuRef,
                depth: this.depth,
                menuId: this.menuId,
                rootMenuId: null
            });
            this.visible = true;
        });
    }

    private initializeMenuItems(items: IExtendedMenuItem[]): void {
        items.forEach(item => {
            item.visible = item.visible !== false;
            this.initializeMenuItems(item.menuItems?.length > 0 ? item.menuItems as IExtendedMenuItem[] : []);
        });
    }

    public get MenuClass(): string {
        return `${this.contextMenuTheme} ${this.menuClass}`;
    }
}
