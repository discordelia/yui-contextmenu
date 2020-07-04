import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {YuiContextMenuContentComponent} from "./yui-context-menu-content.component";

describe("ContextMenuContentComponent", () => {
    let component: YuiContextMenuContentComponent;
    let fixture: ComponentFixture<YuiContextMenuContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YuiContextMenuContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YuiContextMenuContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
