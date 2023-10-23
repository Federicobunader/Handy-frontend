import { Injectable } from '@angular/core';
import { PostService } from '../posts-service/posts.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PostRatingMapper } from 'src/app/core/mappers/post-rating-mapper';
import { postRatingURL, ratingURL } from 'src/app/core/constants/constants';
import { PostRating } from 'src/app/core/models/postRating';

@Injectable({
  providedIn: 'root'
})
export class PostRatingService {

  constructor(
    private postService: PostService,
    private userService: UserService,
    private http: HttpClient,
    private mapper: PostRatingMapper,
    )
    {
      this.mapper = new PostRatingMapper();
    }

  createPostRating(postRating: PostRating): Observable<PostRating> {
    return this.http
      .post(
        postRatingURL ,
        this.mapper.postRatingToDto(postRating)
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToPostRating(response);
        })
      );
  }

  getAverageScore(postID: number): Observable<number> {
    return this.http
      .get<any>(postRatingURL + "/averageScore/" + postID)
      .pipe(
        map((response: any) => {
          // Replace 'rating' with the actual field in the response
          return response;
        }),
      );
  }

  getRatings(postID: number): Observable<PostRating[]> {
    return this.http
      .get<any>(postRatingURL + "/postRatings/" + postID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((postRating: any) => {
            return this.mapper.dtoToPostRating(postRating);
          });
        }),
      );
  }

  emptyRating(): PostRating{
    return {
      id: 0,
      score: 0,
      description: '',
      post: this.postService.emptyPost(),
      author: this.userService.emptyUser(),
    }
  }
}
