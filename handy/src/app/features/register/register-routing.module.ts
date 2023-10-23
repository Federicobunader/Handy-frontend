import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterDialogComponent,
  },
  {
    path: 'profile/edit/:id',
    component: RegisterDialogComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
