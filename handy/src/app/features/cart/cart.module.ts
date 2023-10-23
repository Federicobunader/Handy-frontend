import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { CartRoutingModule } from './cart-routing.module';
import { DialogCartDetailComponent } from './components/cart-detail/cart-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDashboardComponent } from './components/cart-dashboard/cart-dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    DialogCartDetailComponent,
    CartDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    CartRoutingModule,
    MatDialogModule,
    MatExpansionModule,
  ],
  exports: [
    CartDashboardComponent,
    DialogCartDetailComponent
  ]
})
export class CartModule { }
