import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentUalaBisComponent } from './components/payment-uala-bis.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentUalaBisRoutingModule } from './payment-uala-bis-routing.module';



@NgModule({
  declarations: [
    PaymentUalaBisComponent
  ],
  imports: [
    SharedModule,
    PaymentUalaBisRoutingModule,
  ],
  exports: [
    PaymentUalaBisComponent,
  ]
})
export class PaymentUalaBisModule { }
