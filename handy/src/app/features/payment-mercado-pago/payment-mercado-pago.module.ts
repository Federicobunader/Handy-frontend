import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentMercadoPagoComponent } from './components/payment/payment-mercado-pago.component';
import { PaymentMercadoPagoRoutingModule } from './payment-mercado-pago-routing.module';

@NgModule({
  declarations: [
    PaymentMercadoPagoComponent,
  ],
  imports: [
    SharedModule,
    PaymentMercadoPagoRoutingModule,
  ],
  exports: [
    PaymentMercadoPagoComponent,
  ]
})
export class PaymentMercadoPagoModule { }
