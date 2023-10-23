import { TestBed } from '@angular/core/testing';

import { PaymentUalaBisService } from './payment-uala-bis.service';

describe('PaymentUalaBisService', () => {
  let service: PaymentUalaBisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentUalaBisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
