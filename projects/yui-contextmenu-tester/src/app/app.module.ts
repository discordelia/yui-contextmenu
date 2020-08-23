import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ContextMenuModule} from "yui-contextmenu";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ContextMenuModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
