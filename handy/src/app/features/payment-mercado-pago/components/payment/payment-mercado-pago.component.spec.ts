import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMercadoPagoComponent } from './payment-mercado-pago.component';

describe('PaymentMercadoPagoComponent', () => {
  let component: PaymentMercadoPagoComponent;
  let fixture: ComponentFixture<PaymentMercadoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMercadoPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMercadoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
