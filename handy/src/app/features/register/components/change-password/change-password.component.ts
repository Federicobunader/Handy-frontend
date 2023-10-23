import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  private $_destroyed = new Subject();
  private newPassword : string | null = "";
  rightPassword : boolean = true;

  @Output() event = new EventEmitter<string>();

  updatePasswordForm = new FormGroup({
    userOldPassword: new FormControl ('', [Validators.required]),
    userNewPassword: new FormControl ('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()]{8,}$')]),
    repeatNewPasswordField: new FormControl ('', [Validators.required]),
  })

  constructor(
    private userService: UserService,
    private sessiontokenService: SessiontokenService,
 ) {
 }

  ngOnInit(): void {
    this.getUser();
  }

  changeOldPasswordType() {
    var field = document.getElementById("oldPasswordField");
    if(field != null){
      field.getAttribute('type') === "password" ? field.setAttribute('type','text') : field.setAttribute('type','password');
    }
  }

  changeNewPasswordType() {
    var field = document.getElementById("newPasswordField");
    if(field != null){
      field.getAttribute('type') === "password" ? field.setAttribute('type','text') : field.setAttribute('type','password');
    }
  }

  changeRepeatPasswordType(){
    var secondField = document.getElementById("repeatNewPasswordField");
    if(secondField != null){
      secondField.getAttribute('type') === "password" ? secondField.setAttribute('type','text') : secondField.setAttribute('type','password');
    }
  }

  passwordsDontMatch(){
    var field1 = document.getElementById("newPasswordField") as HTMLInputElement | null;
    var field2 = document.getElementById("repeatNewPasswordField") as HTMLInputElement | null;

    return field1 != null && field2 != null ? (field1.value == '' || field2.value == '' ? false : field1.value != field2.value) : false;
  }

  user: User = this.userService.emptyUser();
  getUser(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService
      .getUser(token)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: User) =>{
          this.user = response;
        }))
      .subscribe();
    } else {
      console.error('El token de sesión es nulo');
    }
  }

  saveChanges() {
    if (this.updatePasswordForm.valid && !this.passwordsDontMatch()) {
        var newPassword = this.updatePasswordForm.get('userNewPassword')?.value ?? '';
        var userOldPassword = this.updatePasswordForm.get('userOldPassword')?.value ?? '';

        this.userService
          .updatePassword(this.user.id, userOldPassword , newPassword, false)
          .pipe(takeUntil(this.$_destroyed))
          .subscribe(() => {
            Swal.fire('Exito', 'Contraseña actualizada con éxito', 'success');
            this.event.emit('Shut password toggle');
          });
    }
    else{
      Swal.fire('Error', 'Completar', 'error');
    }
  }

  get disableButton(){
    return this.passwordsDontMatch() || !this.updatePasswordForm.get('userNewPassword')?.valid || this.samePassword || !this.rightPassword || this.updatePasswordForm.get('userOldPassword')?.value == '' || this.updatePasswordForm.get('userNewPassword')?.value == '' || this.updatePasswordForm.get('repeatNewPasswordField')?.value == '';
  }

  get invalidPassword(){
    return !this.updatePasswordForm.get('userNewPassword')?.valid && this.updatePasswordForm.get('userNewPassword')?.value != '';
  }

  get samePassword(){
    return this.updatePasswordForm.get('userNewPassword')?.value == this.updatePasswordForm.get('userOldPassword')?.value && this.rightPassword && this.updatePasswordForm.get('userNewPassword')?.value != '';
  }

  wrongPassword(){

    this.newPassword = this.updatePasswordForm.get('userOldPassword') ? this.updatePasswordForm.get('userOldPassword')!.value : "";

    if(this.newPassword != null)
    {
      this.userService
      .checkPassword(this.user.password, this.newPassword)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: boolean) => (
          this.rightPassword = response))
      )
    .subscribe();
    }
    return this.updatePasswordForm.get('userOldPassword')?.value != this.user.password && this.updatePasswordForm.get('userOldPassword')?.value != '';
  }
}
