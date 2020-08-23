import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ContextMenuContentComponent} from "./context-menu-content.component";

describe("ContextMenuContentComponent", () => {
    let component: ContextMenuContentComponent;
    let fixture: ComponentFixture<ContextMenuContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContextMenuContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContextMenuContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
