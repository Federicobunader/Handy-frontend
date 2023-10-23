import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DialogCartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CartDashboardComponent } from './components/cart-dashboard/cart-dashboard.component';


const routes: Routes = [
  {
    path: 'cart/:id',
    component: DialogCartDetailComponent,
  },
  {
    path: 'carts',
    component: CartDashboardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
