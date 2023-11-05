import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { DialogCheckMailComponent } from './components/check-mail/check-mail/check-mail.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from '../login/components/reset-password/reset-password.component';
import { RegisterMissingFieldsComponent } from './components/register-missing-fields/register-missing-fields.component';

@NgModule({
  declarations: [
    RegisterDialogComponent, 
    DialogCheckMailComponent, 
    ResetPasswordComponent, 
    ChangePasswordComponent, 
    RegisterMissingFieldsComponent
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule,
    MatDialogModule,
  ],
  exports: [
    RegisterDialogComponent,
    ChangePasswordComponent,
  ]
})
export class RegisterModule { }
