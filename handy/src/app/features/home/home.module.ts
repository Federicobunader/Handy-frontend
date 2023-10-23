import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home.component';
import { NotLoggedHomeComponent } from './components/not-logged-home/not-logged-home.component';
import { LoggedHomeComponent } from './components/logged-home/logged-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { RegisterRoutingModule } from '../register/register-routing.module';
import { LoginRoutingModule } from '../login/login-routing.module';
import { PaymentMercadoPagoModule } from '../payment-mercado-pago/payment-mercado-pago.module';
import { PaymentUalaBisModule } from '../payment-uala-bis/payment-uala-bis.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoggedHomeComponent,
    NotLoggedHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    RegisterRoutingModule,
    LoginRoutingModule,
    PaymentMercadoPagoModule,
    PaymentUalaBisModule,
  ],
})
export class HomeModule { }
