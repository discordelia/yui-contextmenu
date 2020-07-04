import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { YuiContextMenuModule } from "../../../yui-contextmenu/src/lib/yui-context-menu.module";
import { YuiContextMenuService } from "../../../yui-contextmenu/src/lib/services/yui-context-menu.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        YuiContextMenuModule,
        FontAwesomeModule
    ],
    providers: [
        YuiContextMenuService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
