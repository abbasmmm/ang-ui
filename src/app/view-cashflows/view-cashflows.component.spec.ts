import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCashflowsComponent } from './view-cashflows.component';

describe('ViewCashflowsComponent', () => {
  let component: ViewCashflowsComponent;
  let fixture: ComponentFixture<ViewCashflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCashflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCashflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
