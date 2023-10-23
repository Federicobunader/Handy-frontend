import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { paymentMethodURL } from 'src/app/core/constants/constants';
import { PaymentMethodMapper } from 'src/app/core/mappers/payment-method-mapper';
import { PaymentMethod } from 'src/app/core/models/paymentMethod';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http: HttpClient, private mapper: PaymentMethodMapper) { }

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http
      .get(paymentMethodURL)
      .pipe(
        map((response) => {
          const res: any = response;
          return res.map((paymentMethod: any) => {
            return this.mapper.dtoToPaymentMethod(paymentMethod);
          });
        }),
      );
  }

  emptyPaymentMethod(): PaymentMethod{
    return {
      id: 0,
      name: '',
    }
  }
}
