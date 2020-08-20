import {IContextMenuRef} from "./IContextMenuRef";

export interface IMenuCloseEvent {
    contextMenuRef: IContextMenuRef;
    depth: number;
    menuId?: number;
    rootMenuId?: number;
}
