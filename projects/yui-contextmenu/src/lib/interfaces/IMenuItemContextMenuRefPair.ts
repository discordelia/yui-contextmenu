import { IContextMenuRef } from "./IContextMenuRef";
import { IExtendedMenuItem } from "./IExtendedMenuItem";

export interface IMenuItemContextMenuRefPair {
    menuItem: IExtendedMenuItem;
    contextMenuRef: IContextMenuRef;
}
