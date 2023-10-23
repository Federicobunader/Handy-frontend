import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { MailService } from 'src/app/shared/services/mail/mail.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.css']
})
export class DialogCheckMailComponent {
  codeInput: FormControl;
  code: string = '';

  private $_destroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DialogCheckMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dataUser: User},
    private mailService: MailService,
    private userService: UserService,

  ) {
    this.codeInput = new FormControl('', [Validators.required]);
  }

  sendButton: String = '';
  user: User = this.userService.emptyUser();

  ngOnInit(): void {
    this.user = this.data.dataUser;

    this.mailService
      .sendEmailAndGetCheckCode(this.user)
      .pipe(takeUntil(this.$_destroyed))
      .subscribe((response: string) =>
      {
        this.code = response;
      });
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    if (this.codeInput.valid) {
      this.dialogRef.close(true);
    }else{
      this.dialogRef.close(false);
    }
  }
}
