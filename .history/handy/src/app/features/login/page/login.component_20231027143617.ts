import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ConfirmNewGeneratedPasswordComponent } from '../components/confirm-new-generated-password/confirm-new-generated-password.component';
import { GoogleApiService } from '../services/google-service/google-api.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  isGoogleAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    //private googleApi: GoogleApiService
    ) {}

  ngOnInit(): void {
  }

  loginauth() {

    const username = this.usernameInput.nativeElement.value.toLocaleLowerCase();
    const password = this.passwordInput.nativeElement.value;

    this.authService.login(username, password).subscribe(
      () => {
        // El inicio de sesión fue exitoso, realizar acciones adicionales si es necesario
        this.router.navigateByUrl('/home');
      },
      (error) => {
        // El inicio de sesión falló, manejar el error si es necesario
        console.error('Error al iniciar sesion', error);
        Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
      }
    );
  }

  changePasswordType() {
    var field = document.getElementById("passwordField");
    if(field != null){
      field.getAttribute('type') === "password" ? field.setAttribute('type','text') : field.setAttribute('type','password');
    }
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
  });

  changePassword(): void {
    const resetPasswordDialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '600px',
    });

    resetPasswordDialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        // Here you can use the value entered by the user (result)
        this.openConfirmPasswordDialog(result);
      }
    });
  }

  openConfirmPasswordDialog(userData: any): void {
      const confirmDialogRef = this.dialog.open(ConfirmNewGeneratedPasswordComponent, {
        width: '600px',
        data: {user: userData}
      });

      confirmDialogRef.afterClosed().subscribe();
  }


  googleLogin() {
    this.isGoogleAuth = true;
    //this.googleApi.setIsGoogleLogin(true);
  }
}
