import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { userRatingURL } from 'src/app/core/constants/constants';
import { UserRating } from 'src/app/core/models/userRating';
import { UserRatingMapper } from 'src/app/core/mappers/user-rating-mapper';
import { CartService } from 'src/app/features/cart/services/cart-service/cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserRatingService {

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private http: HttpClient,
    private mapper: UserRatingMapper,
    )
    {
      this.mapper = new UserRatingMapper();
    }

  createUserRating(userRating: UserRating): Observable<UserRating> {
    return this.http
      .post(
        userRatingURL,
        this.mapper.userRatingToDto(userRating)
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToUserRating(response);
        })
      );
  }

  getAverageScore(userID: number): Observable<number> {
    return this.http
      .get<any>(userRatingURL + "/averageScore/" + userID)
      .pipe(
        map((response: any) => {
          // Replace 'rating' with the actual field in the response
          return response;
        }),
      );
  }

  getRatings(userID: number): Observable<UserRating[]> {
    return this.http
      .get<any>(userRatingURL + "/userRatings/" + userID)
      .pipe(
        map((response) => {
          const res: any = response;

          return res.map((userRating: any) => {
            return this.mapper.dtoToUserRating(userRating);
          });
        }),
      );
  }

  emptyRating(): UserRating{
    return {
      id: 0,
      score: 0,
      description: '',
      ratedUser: this.userService.emptyUser(),
      author: this.userService.emptyUser(),
      cart: this.cartService.emptyCart(),
      creationDate: new Date(),
    }
  }
}
