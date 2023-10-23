import { Injectable } from "@angular/core";
import { PaymentMethod } from "../models/paymentMethod";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodMapper {

  dtoToPaymentMethod(paymentMethod: any): PaymentMethod {
    return {
      // variable del front: variable del back
      id: paymentMethod?.id ? paymentMethod.id : 0,
      name: paymentMethod?.name ? paymentMethod.name : '',
    };
  }

  paymentMethodToDto(paymentMethod: PaymentMethod): any {
    return {
      //Variable del back: Variable del front
      id: paymentMethod?.id ? paymentMethod.id : 0,
      name: paymentMethod?.name ? paymentMethod.name : '',
    };
  }

}
