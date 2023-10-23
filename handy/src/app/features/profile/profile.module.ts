import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { RegisterRoutingModule } from '../register/register-routing.module';
import { RegisterModule } from '../register/register.module';
import { LoginRoutingModule } from '../login/login-routing.module';
import { PaymentMercadoPagoModule } from '../payment-mercado-pago/payment-mercado-pago.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PostsModule } from '../posts/posts.module';
import { CartModule } from '../cart/cart.module';
import { ChatModule } from '../chat/chat.module';
import { PurchaseModule } from '../purchase/purchase.module';

@NgModule({
  declarations: [
    ProfileDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    RegisterRoutingModule,
    LoginRoutingModule,
    PaymentMercadoPagoModule,
    MatExpansionModule,
    MatListModule,
    RegisterModule,
    PostsModule,
    CartModule,
    ChatModule,
    PurchaseModule,
  ]
})
export class ProfileModule { }
