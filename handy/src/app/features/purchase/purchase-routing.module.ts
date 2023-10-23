import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';


const routes: Routes = [
  {
    path: 'purchase/:id',
    component: PurchaseDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule {}
