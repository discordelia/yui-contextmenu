import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { YuiContextMenuModule } from "yui-contextmenu";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        YuiContextMenuModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
