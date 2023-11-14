import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CommentsService } from '../../services/comments-service/comments.service';
import { User } from 'src/app/core/models/user';
import { Comment } from 'src/app/core/models/comment';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts-comment-details',
  templateUrl: './posts-comment-details.component.html',
  styleUrls: ['./posts-comment-details.component.css']
})
export class DialogPostsCommentDetailsComponent {

  content: FormControl;

  private $_destroyed = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DialogPostsCommentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {post: Post, parentComment: Comment},
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private commentService: CommentsService,
    public dialog: MatDialog,
  ) {
    this.content = new FormControl('', [Validators.required, Validators.maxLength(500)]);
  }

  user: User = this.userService.emptyUser();
  comment: Comment = this.commentService.emptyComment();
  title: String = '';
  sendButton: String = '';
  commentsErrorMessage: String = '';

  ngOnInit(): void {
    this.getUser();
    this.commentsErrorMessage = this.sendButton == 'Enviar respuesta' ? 'La respuesta no puede ser de mas de 500 caracteres' : 'La consulta no puede ser de mas de 500 caracteres';
  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  getUser(){
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.sessiontokenService.getUser(token).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('El token de sesión es nulo');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.content.valid) {
      const spinnerDialog = this.dialog.open(ProgressSpinnerComponent, {
        panelClass: 'transparent',
        disableClose: true
      });
      this.comment.content = this.content.value,
      this.comment.post = this.data.post,
      this.comment.author = this.user,
      this.comment.parentComment = this.data.parentComment

      const errorMessage = this.sendButton == 'Enviar consulta' ? 'No se pudo enviar su consulta' : 'No se pudo enviar su respuesta';
      const successMessage = this.sendButton == 'Enviar consulta' ? '¡Consulta enviada con éxito!' : '¡Respuesta enviada con éxito!';

      this.commentService
      .create(this.comment)
      .subscribe( () => {
        this.commentService.setComment(this.comment);
        spinnerDialog.close();
        Swal.fire('Exito', successMessage, 'success');
      },
      () => {
        Swal.fire('Error', errorMessage, 'error');
      });
    }
    this.dialogRef.close();
  }

}
