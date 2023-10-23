import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }