import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMercadoPagoComponent } from './components/payment/payment-mercado-pago.component';


const routes: Routes = [
  {
    path: 'payment-mercado-pago',
    component: PaymentMercadoPagoComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMercadoPagoRoutingModule {}
