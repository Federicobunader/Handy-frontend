import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Comment } from 'src/app/core/models/comment';
import { CommentsService } from '../../services/comments-service/comments.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SessiontokenService } from 'src/app/features/home/services/sessiontoken.service';
import { PostService } from '../../services/posts-service/posts.service';
import { Post } from 'src/app/core/models/post';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostsCommentDetailsComponent } from '../posts-comment-details/posts-comment-details.component';

@Component({
  selector: 'app-posts-comment-dashboard',
  templateUrl: './posts-comment-dashboard.component.html',
  styleUrls: ['./posts-comment-dashboard.component.css']
})
export class PostsCommentDashboardComponent {

  private $_destroyed = new Subject();

  constructor(
    private sessiontokenService: SessiontokenService,
    private userService: UserService,
    private postService: PostService,
    private commentsService: CommentsService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  user: User = this.userService.emptyUser();
  post: Post = this.postService.emptyPost();
  comments: Comment[] = [];

  ngOnInit(): void {
    this.getUser();
    this.setPost();

    this.commentsService.getComment().subscribe(
      () => {
        this.getCommentsForPost();
      }
    );
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

  answer(comment: Comment): void{
    const dialogRef = this.dialog.open(DialogPostsCommentDetailsComponent, {
      width: '600px',
      data: {post: this.post, parentComment: comment},
    });
    dialogRef.componentInstance.title = 'Dejá tu respuesta';
    dialogRef.componentInstance.sendButton = 'Enviar respuesta';

    dialogRef.afterClosed().subscribe(result => {
      this.loadAnswers();
    });
  }

  setPost(){
    this.postService.getPost().subscribe(
       (post: Post) => {
        this.post = post;
        this.getCommentsForPost();
      }
    );

   }

  loadAnswers(){

    this.comments.forEach(comment => {
      this.commentsService
    .getAnswersForComment(comment.id)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Comment[]) => (
          comment.answers = response))
      )
    .subscribe();
    });
  }

  getCommentsForPost(){
    this.commentsService
    .getCommentsForPost(this.post.id)
      .pipe(
        takeUntil(this.$_destroyed),
        map((response: Comment[]) =>{
            this.comments = response;
          }
        )
      )
    .subscribe(() =>
      this.loadAnswers()
    );
  }

}
