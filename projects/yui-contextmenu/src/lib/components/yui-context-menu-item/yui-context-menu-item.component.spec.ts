import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuiContextMenuItemComponent } from './yui-context-menu-item.component';

describe('ContextMenuItemComponent', () => {
  let component: YuiContextMenuItemComponent;
  let fixture: ComponentFixture<YuiContextMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuiContextMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuiContextMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
