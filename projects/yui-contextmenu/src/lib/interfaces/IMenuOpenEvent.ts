import {IContextMenuRef} from "./IContextMenuRef";

export interface IMenuOpenEvent {
    contextMenuRef: IContextMenuRef;
    depth: number;
    menuId?: number;
    rootMenuId?: number;
}
