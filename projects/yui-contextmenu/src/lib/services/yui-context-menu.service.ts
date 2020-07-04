import { Injectable, TemplateRef } from "@angular/core";
import { IContextMenuTarget } from "../interfaces/IContextMenuTarget";
import { IContextMenuRef } from "../interfaces/IContextMenuRef";
import { ContextMenuService } from "./context-menu.service";

@Injectable({
    providedIn: "root"
})
export class YuiContextMenuService {

    public constructor(
        private readonly contextMenuService: ContextMenuService
    ) {
    }

    public createContextMenu(target: IContextMenuTarget, template: TemplateRef<any>): IContextMenuRef {
        return this.contextMenuService.createContextMenu(target, template, false);
    }

}
