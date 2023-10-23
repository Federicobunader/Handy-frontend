import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';
import { CartModule } from '../cart/cart.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PurchaseDashboardComponent } from './components/purchase-dashboard/purchase-dashboard.component';
import { PurchaseReturnedComponent } from './components/purchase-returned/purchase-returned.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    PurchaseDetailComponent,
    PurchaseDashboardComponent,
    PurchaseReturnedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    CartModule,
    PurchaseRoutingModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  exports:[
    PurchaseDashboardComponent,
    PurchaseReturnedComponent
  ]
})
export class PurchaseModule { }
