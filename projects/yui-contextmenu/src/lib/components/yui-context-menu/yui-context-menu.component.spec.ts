import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {YuiContextMenuComponent} from "./yui-context-menu.component";

describe("ContextMenuComponent", () => {
    let component: YuiContextMenuComponent;
    let fixture: ComponentFixture<YuiContextMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YuiContextMenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YuiContextMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
