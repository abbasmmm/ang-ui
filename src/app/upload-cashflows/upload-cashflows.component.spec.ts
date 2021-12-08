import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCashflowsComponent } from './upload-cashflows.component';

describe('UploadCashflowsComponent', () => {
  let component: UploadCashflowsComponent;
  let fixture: ComponentFixture<UploadCashflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCashflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCashflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
