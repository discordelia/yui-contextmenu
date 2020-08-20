import { IContextMenuRef } from "./IContextMenuRef";

export interface IContextMenuData {
    contextMenuRef: IContextMenuRef;
    depth: number;
    hasSubmenu?: boolean;
    isSubmenu?: boolean;
    menuId?: number;
    rootMenuId?: number;
}
