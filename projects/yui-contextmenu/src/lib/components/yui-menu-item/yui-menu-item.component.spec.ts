import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuiMenuItemComponent } from './yui-menu-item.component';

describe('YuiMenuItemComponent', () => {
  let component: YuiMenuItemComponent;
  let fixture: ComponentFixture<YuiMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuiMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuiMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
