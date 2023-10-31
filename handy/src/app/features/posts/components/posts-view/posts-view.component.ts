import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/posts-service/posts.service';
import { Subject, map, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/post';
import { MatDialog } from '@angular/material/dialog';
import { DialogCartDetailComponent } from 'src/app/features/cart/components/cart-detail/cart-detail.component';
import { DialogPostsCommentDetailsComponent } from '../posts-comment-details/posts-comment-details.component';
import { DialogPostsRatingsComponent } from '../post-ratings/post-ratings.component';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/core/models/user';
import { DialogPostPhotoDetailsComponent } from '../post-photos-details/post-photos-details.component';
import { PostsArViewerComponent } from '../posts-ar-viewer/posts-ar-viewer.component';
import { PostRatingService } from '../../services/post-rating-service/post-rating.service';
import { PostsCommentDashboardComponent } from '../posts-comment-dashboard/posts-comment-dashboard.component';
import { PostRating } from 'src/app/core/models/postRating';
import { Location } from '@angular/common';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.css']
})
export class PostsViewComponent {

  private $_destroyed = new Subject();
  private postID! : number;
  averageScore: number = 0;
  ratings: PostRating [] = [];
  amountOfPictures: number = 0;

  constructor(
      private route: ActivatedRoute,
      private postService: PostService,
      private postRatingService: PostRatingService,
      public dialog: MatDialog,
      private sessiontokenService: SessiontokenService,
      private userService: UserService,
      private router: Router,
      private _location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postID = params['id'];
      this.getPost();
     });
     this.getUser();
     this.getAverageScore();
     this.getRatings();
  }

  user: User = this.userService.emptyUser();

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
      this.router.navigateByUrl('/login');
    }
  }

  getAverageScore(){
    this.postRatingService
    .getAverageScore(this.postID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: number) => (
          this.averageScore = response))
      )
    .subscribe();
  }

  ratingMessage = '';
  getRatings(){
    this.postRatingService
    .getRatings(this.postID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: PostRating[]) => (
          this.ratings = response))
      )
    .subscribe(() => {
      if(this.ratings.length == 0){
        this.ratingMessage = '¡Sé el primero en opinar sobre este producto!'
      } else if (this.ratings.length == 1){
        this.ratingMessage = '1 usuario opinó';
      } else {
        this.ratingMessage = this.ratings.length + ' usuarios opinaron';
      }
    });
  }

  createChat(): void{
    this.router.navigate(['chat', this.post.author.id]);
  }

  editPost(){
    if(this.post.author.id === this.user.id){
      this.router.navigate(['posts/edit', this.post.id]);
    }
  }

  createCart(): void {
    const dialogRef = this.dialog.open(DialogCartDetailComponent, {
      width: '600px',
      data: {amount: 1, post: this.post},
    });
  }

  openPhotosModal(): void{
    const dialogRef = this.dialog.open(DialogPostPhotoDetailsComponent, {
      data: {post: this.post, parentComment: null},
    });
    dialogRef.componentInstance.post = this.post;
  }

  showPostRatings(): void{
    const dialogRef = this.dialog.open(DialogPostsRatingsComponent, {
      width: '1200px',
    });
    dialogRef.componentInstance.ratings = this.ratings;
  }

  createComment(): void {
    const dialogRef = this.dialog.open(DialogPostsCommentDetailsComponent, {
      width: '600px',
      data: {post: this.post, parentComment: null},
    });
    dialogRef.componentInstance.title = 'Dejá tu consulta';
    dialogRef.componentInstance.sendButton = 'Enviar consulta';
  }  

  viewAR(): void{
    const dialogRef = this.dialog.open(PostsArViewerComponent, {
      width: '1200px',
    });
    //this.router.navigate(['posts/AR']);
  }

  post : Post = this.postService.emptyPost();

  getPost(){
    this.postService
    .getPostByID(this.postID)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Post) => (
          this.post = response))
      )
    .subscribe(() => {
      this.postService.setPost(this.post);
      this.amountOfPictures = this.post.photos.length;
      this.post.product.depositPrice = this.post.product.depositPrice.toLocaleString('es-CO');
      this.post.product.rentalPrice = this.post.product.rentalPrice.toLocaleString('es-CO');
      this.post.product.salesPrice = this.post.product.salesPrice.toLocaleString('es-CO');
    });
  }

  get canBeSold(){
    return this.post.product.salesPrice != undefined;
  }

  goBack(){
    this._location.back();
  }

}
