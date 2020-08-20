import { Injectable, TemplateRef } from "@angular/core";
import { ConnectedPosition } from "@angular/cdk/overlay";
import { IContextMenuRef } from "../interfaces/IContextMenuRef";
import { IContextMenuTarget } from "../interfaces/IContextMenuTarget";
import { IContextMenuData } from "../interfaces/IContextMenuData";
import { Subscription, Subject } from "rxjs";
import { YuiPopupService } from "@discordelia/popup";

@Injectable()
export class ContextMenuService {
    public static menuIdentifier: number = 0x404;
    public static menuItemIdentifier: number = 0x99;
    public static readonly subMenuPositions: ConnectedPosition[] = [
        {
            originX: "end", originY: "top",
            overlayX: "start", overlayY: "top"
        },
        {
            originX: "start", originY: "top",
            overlayX: "end", overlayY: "top"
        },
        {
            originX: "end", originY: "bottom",
            overlayX: "start", overlayY: "bottom"
        },
        {
            originX: "start", originY: "bottom",
            overlayX: "end", overlayY: "bottom"
        }
    ];

    private activeMenuMap: Map<number, Array<IContextMenuData>> = new Map<number, Array<IContextMenuData>>();
    private currentDepth: number = 0;
    private menuCloseSubject$: Subject<number> = new Subject<number>();
    private outsideClickSubscription$: Subscription = null;
    private submenuCreatedViaKeyboard: boolean = false;

    public constructor(
        private popupService: YuiPopupService
    ) {
    }

    public addActiveMenu(menuData: IContextMenuData): void {
        const menuList = this.activeMenuMap.get(menuData.rootMenuId ?? menuData.menuId);
        if (menuList?.length > 0) {
            menuList.push(menuData);
            // if (menuData.isSubmenu) {
            //     const rootMenu = menuList.find(m => !m.isSubmenu);
            //     rootMenu.hasOpenSubmenu = true;
            // }
        } else {
            this.activeMenuMap.set(menuData.menuId, [menuData]);
        }
    }

    public closeAll(): void {
        this.activeMenuMap.forEach((menuData) => {
            menuData.forEach(m => this.close(m.rootMenuId ?? m.menuId));
        });
        this.activeMenuMap.clear();
        this.outsideClickSubscription$?.unsubscribe();
    }

    public closeMenu(rootMenuId: number): void {
        this.close(rootMenuId);
        this.outsideClickSubscription$?.unsubscribe();
    }

    public createContextMenu(target: IContextMenuTarget, template: TemplateRef<any>, submenu: boolean = false): IContextMenuRef {
        const popupRef = this.popupService.createPopup({
            template,
            target,
            coordinates: null,
            hasBackdrop: false,
            positions: submenu ? ContextMenuService.subMenuPositions : null
        });
        return {
            popupRef
        } as IContextMenuRef;
    }

    public removeMenuViaDepth(startDepth: number, rootMenuId: number): void {
        const menuList = this.activeMenuMap.get(rootMenuId);
        if (menuList?.length > 0) {
            menuList.filter(m => m.depth >= startDepth).forEach(m => m.contextMenuRef?.popupRef?.close());
            this.activeMenuMap.set(rootMenuId, menuList.filter(m => m.depth < startDepth));
            // const rootMenuData = menuList.find(m => !m.isSubmenu);
            // if (rootMenuData) {
            //     rootMenuData.hasOpenSubmenu = this.activeMenuMap.get(rootMenuId)
            //         ?.some(m => !!m.rootMenuId && m.rootMenuId === rootMenuId);
            // }
            this.CurrentDepth = startDepth;
            this.menuCloseSubject$.next(startDepth);
        }
    }

    private close(rootMenuId: number): void {
        this.removeMenuViaDepth(0, rootMenuId);
        this.activeMenuMap.delete(rootMenuId);
    }

    public get CurrentDepth(): number {
        return this.currentDepth;
    }

    public set CurrentDepth(depth: number) {
        this.currentDepth = depth;
    }

    public get MenuCloseSubject$(): Subject<number> {
        return this.menuCloseSubject$;
    }

    public get SubmenuCreatedViaKeyboard(): boolean {
        return this.submenuCreatedViaKeyboard;
    }

    public set SubmenuCreatedViaKeyboard(viaKeyboard: boolean) {
        this.submenuCreatedViaKeyboard = viaKeyboard;
    }
}
