import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-new-generated-password',
  templateUrl: './confirm-new-generated-password.component.html',
  styleUrls: ['./confirm-new-generated-password.component.css']
})
export class ConfirmNewGeneratedPasswordComponent implements OnInit{

  newPassword: FormControl;

  private $_destroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ConfirmNewGeneratedPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private userService: UserService,
  ) {
    this.newPassword = new FormControl('', [Validators.required]);
  }

  user: User = this.userService.emptyUser();

  ngOnInit(): void {
    this.user = this.data.user;
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.newPassword.valid) {
      this.userService
      .updatePassword(this.user.id, this.user.password, this.newPassword.value, true)
      .pipe(takeUntil(this.$_destroyed))
      .subscribe( () => { // se supone que aca chequea que las contraseñas coincidan? porque no funciona :P
          Swal.fire('Exito', 'Contraseña restaurada exitosamente', 'success');
          this.dialogRef.close(true);
        },
        (error) => {
          Swal.fire('Error', 'La contraseña es incorrecta', 'error');
          this.dialogRef.close(false);
        }
      );
    }
  }

}
