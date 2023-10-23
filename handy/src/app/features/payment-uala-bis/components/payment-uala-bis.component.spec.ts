import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUalaBisComponent } from './payment-uala-bis.component';

describe('PaymentUalaBisComponent', () => {
  let component: PaymentUalaBisComponent;
  let fixture: ComponentFixture<PaymentUalaBisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentUalaBisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentUalaBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
