import { Component } from '@angular/core';
import { PaymentUalaBisService } from '../services/payment-uala-bis.service';

@Component({
  selector: 'app-payment-uala-bis',
  templateUrl: './payment-uala-bis.component.html',
  styleUrls: ['./payment-uala-bis.component.css']
})
export class PaymentUalaBisComponent {

  constructor(private paymentUalaBisService: PaymentUalaBisService ) {
  }
}
