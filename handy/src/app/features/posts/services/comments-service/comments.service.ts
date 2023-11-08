import { Injectable } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';
import { PostService } from '../posts-service/posts.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { CommentMapper } from 'src/app/core/mappers/comment-mapper';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { commentURL } from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private postService: PostService,
    private userService: UserService,
    private http: HttpClient,
    private mapper: CommentMapper,
    )
    {
      this.mapper = new CommentMapper();
    }

  private comment: BehaviorSubject<Comment> = new BehaviorSubject<Comment>(this.emptyComment());

  setComment(commentsToSet : Comment){
    return this.comment.next(commentsToSet);
 }

  getComment(): Observable <Comment>{
    return this.comment;
  }

  create(comment: Comment): Observable<Comment> {
    return this.http
      .post(
        commentURL,
        this.mapper.commentToDto(comment,[])
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToComment(response);
        })
      );
  }

  getCommentsForPost(postID: number): Observable<Comment[]> {
    return this.http
      .get(commentURL + "/" + postID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((comment: any) => {
            return this.mapper.dtoToComment(comment);
          });
        }),
      );
  }

  getAnswersForComment(commentID: number): Observable<Comment[]> {
    return this.http
      .get(commentURL + "/answers/" + commentID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((comment: any) => {
            return this.mapper.dtoToComment(comment);
          });
        }),
      );
  }

  emptyComment(): Comment{
    return {
      id: 0,
      content: '',
      score: 0,
      parentComment: {
        id: 0,
        content: '',
        score: 0,
        parentComment: null,
        post: this.postService.emptyPost(),
        author: this.userService.emptyUser(),
        answers: [],
        creationDate: new Date(),
      },
      post: this.postService.emptyPost(),
      author: this.userService.emptyUser(),
      answers: [],
      creationDate: new Date(),
    }
  }
}
