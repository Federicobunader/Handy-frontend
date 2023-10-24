
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { PostRatingService } from '../../../features/posts/services/post-rating-service/post-rating.service';
import { PostRating } from 'src/app/core/models/postRating';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { UserRating } from 'src/app/core/models/userRating';
import { UserRatingService } from '../../services/user-rating-service/user-rating.service';
import Swal from 'sweetalert2';
import { Cart } from 'src/app/core/models/cart';

@Component({
  selector: 'app-rating',
  templateUrl: './rating-details.component.html',
  styleUrls: ['./rating-details.component.css']
})
export class DialogRatingDetailsComponent {

  private $_destroyed = new Subject();
  @Input() postName : string = '';
  @Input() wasSaved : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogRatingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {post: Post, author: User, userRated: User, isUserRating: boolean, cart: Cart},
    private postRatingService: PostRatingService,
    private userRatingService: UserRatingService,
  ) {

  }

  ngOnDestroy(): void {
    this.$_destroyed.next(Subject);
    this.$_destroyed.complete();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  postRating : PostRating = this.postRatingService.emptyRating();
  userRating : UserRating = this.userRatingService.emptyRating();

  score: number = 0;

  setScore(rating: number) {
    this.score = rating;
  }

  comment: any = 'Ningún comentario fue agregado';
  saveComment(event: any){
    this.comment = event.target.value;
  }

  onSaveClick(): void {

    this.postRating.author = this.data.author;
    this.postRating.score = this.score;
    this.postRating.description = String(this.comment);
    this.postRating.cart =this.data.cart;

    if(!this.data.isUserRating){
      this.postRating.post =  this.data.post;

      this.postRatingService
        .createPostRating(this.postRating)
        .pipe(takeUntil(this.$_destroyed))
        .subscribe( () => {
          Swal.fire('Exito', '¡Calificación enviada con éxito!', 'success');
          this.wasSaved = true;
          this.dialogRef.close();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo enviar tu calificación', 'error');
          this.dialogRef.close();
        });
    } else {
      this.userRating.ratedUser =  this.data.userRated;

      this.userRatingService
        .createUserRating(this.userRating)
        .pipe(takeUntil(this.$_destroyed))
        .subscribe( () => {
          Swal.fire('Exito', '¡Calificación enviada con éxito!', 'success');
          this.dialogRef.close();
        },
        (error) => {
          Swal.fire('Error', 'Hubo un error', 'error');
          this.dialogRef.close();
        });
    }

  }
}
