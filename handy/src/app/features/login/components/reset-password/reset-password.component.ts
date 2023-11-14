import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { MailService } from 'src/app/shared/services/mail/mail.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  userName: FormControl;

  private $_destroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private mailService: MailService,
    private userService: UserService,
  ) {
    this.userName = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  onCancelClick(): void {
    //var user = this.userService.emptyUser();
    this.dialogRef.close();
  }

  showSendingEmail = false;
  onSaveClick(): void {

    var user = this.userService.emptyUser();

    if (this.userName.valid) {
      this.mailService
      .sendEmailToRecoverPassword(this.userName.value)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: User) =>{
          user = response;
        }
        )
      )
      .subscribe(() => {
          this.dialogRef.close(user)
          Swal.fire('Exito', 'Email enviado', 'success');
          this.showSendingEmail = true;
        },
        (error) => {
          Swal.fire('Error', 'El usuario no existe', 'error');
          this.showSendingEmail = false;
        }
      );
    } else {
      this.dialogRef.close(user);
    }
  }
}
