import { Component } from '@angular/core';
import { PaymentMercadoPagoService } from '../../services/payment-mercado-pago.service';


@Component({
  selector: 'app-mercado-pago',
  templateUrl: './payment-mercado-pago.component.html',
  styleUrls: ['./payment-mercado-pago.component.css']
})
export class PaymentMercadoPagoComponent  {

    constructor(private paymentMercadoPagoService: PaymentMercadoPagoService ) {
    }

  }
