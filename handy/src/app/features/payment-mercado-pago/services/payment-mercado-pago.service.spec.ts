import { TestBed } from '@angular/core/testing';

import { PaymentMercadoPagoService } from './payment-mercado-pago.service';

describe('PaymentMercadoPagoService', () => {
  let service: PaymentMercadoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMercadoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
