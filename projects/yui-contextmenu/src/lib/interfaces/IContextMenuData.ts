import { IContextMenuRef } from "./IContextMenuRef";

export interface IContextMenuData {
    contextMenuRef: IContextMenuRef;
    depth: number;
    hasOpenSubmenu?: boolean;
    isSubmenu?: boolean;
    menuId?: number;
    rootMenuId?: number;
}
