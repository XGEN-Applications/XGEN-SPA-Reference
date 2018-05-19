import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarViewComponent } from './mobile-navbar-view.component';

describe('MobileNavbarComponent', () => {
  let component: MobileNavbarViewComponent;
  let fixture: ComponentFixture<MobileNavbarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileNavbarViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNavbarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
