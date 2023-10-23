import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { ConfirmNewGeneratedPasswordComponent } from './components/confirm-new-generated-password/confirm-new-generated-password.component';
import { OAuthModule } from 'angular-oauth2-oidc';



@NgModule({
  declarations: [
    LoginComponent,
    GoogleLoginComponent,
    ConfirmNewGeneratedPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    OAuthModule.forRoot()
  ]
})
export class LoginModule { }
