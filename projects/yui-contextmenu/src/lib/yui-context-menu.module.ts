import { NgModule } from "@angular/core";
import { YuiPopupModule } from "@discordelia/popup";
import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { YuiContextMenuComponent } from "./components/yui-context-menu/yui-context-menu.component";
import { YuiContextMenuContentComponent } from "./components/yui-context-menu-content/yui-context-menu-content.component";
import { YuiContextMenuItemComponent } from "./components/yui-context-menu-item/yui-context-menu-item.component";
import { YuiMenuItemComponent } from "./components/yui-menu-item/yui-menu-item.component";
import { ContextMenuService } from "./services/context-menu.service";

@NgModule({
    declarations: [
        YuiContextMenuComponent,
        YuiContextMenuContentComponent,
        YuiContextMenuItemComponent,
        YuiMenuItemComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        YuiPopupModule
    ],
    exports: [
        YuiContextMenuComponent,
        YuiMenuItemComponent
    ],
    providers: [
        ContextMenuService
    ]
})
export class YuiContextMenuModule {
}
