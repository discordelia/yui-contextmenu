import { NgModule } from "@angular/core";
import { YuiPopupModule } from "@discordelia/popup";
import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";
import { ContextMenuContentComponent } from "./components/context-menu-content/context-menu-content.component";
import { ContextMenuItemComponent } from "./components/context-menu-item/context-menu-item.component";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { ContextMenuService } from "./services/context-menu.service";

@NgModule({
    declarations: [
        ContextMenuComponent,
        ContextMenuContentComponent,
        ContextMenuItemComponent,
        MenuItemComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        YuiPopupModule
    ],
    exports: [
        ContextMenuComponent,
        MenuItemComponent
    ],
    providers: [
        ContextMenuService
    ]
})
export class ContextMenuModule {
}
