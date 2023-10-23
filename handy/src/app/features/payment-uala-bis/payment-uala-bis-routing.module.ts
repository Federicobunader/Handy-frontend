import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentUalaBisComponent } from './components/payment-uala-bis.component';

const routes: Routes = [
  {
    path: 'payment-uala-bis',
    component: PaymentUalaBisComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentUalaBisRoutingModule {}
