import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { MailService } from 'src/app/shared/services/mail/mail.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';
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
    public dialog: MatDialog,
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
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const dialogRef = this.dialog.open(ProgressSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });

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
          dialogRef.close();
        },
        (error) => {
          Swal.fire('Error', 'El usuario no existe', 'error');
          dialogRef.close();
        }
      );
    } else {
      this.dialogRef.close(user);
    }
  }
}
