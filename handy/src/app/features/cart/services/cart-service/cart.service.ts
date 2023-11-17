import { Injectable } from '@angular/core';
import { PostService } from '../../../posts/services/posts-service/posts.service';
import { Cart } from 'src/app/core/models/cart';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { cartURL, totalToPayPerCarttURL } from 'src/app/core/constants/constants';
import { CartMapper } from 'src/app/core/mappers/cart-mapper';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private postService: PostService,
    private userService: UserService,
    private http: HttpClient,
    private mapper: CartMapper,
  )
  {
    this.mapper = new CartMapper();
  }

  createOrUpdateTotalToPayPerCart(cart: Cart): Observable<Cart> {
    return this.http
      .post(
        totalToPayPerCarttURL,
        this.mapper.cartToDto(cart)
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToCart(response);
        })
      );
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http
      .post(
        cartURL,
        this.mapper.cartToDto(cart)
      )
      .pipe(
        map((response) => {
          return this.mapper.dtoToCart(response);
        })
      );
  }

  getCartByID(cartID: number): Observable<Cart> {
    return this.http
      .get(cartURL + "/cartByID/" + cartID)
      .pipe(
          map((response) => {
            return this.mapper.dtoToCart(response);
          })
      );
  }

  deleteCart(cartID: number): Observable<any> {
    return this.http
      .delete(totalToPayPerCarttURL + "/deleteCart/" + cartID)
      .pipe(
          map((response) => {
            return response;
          })
      );
  }

  emptyCart(): Cart{
    return {
      id: 0,
      amount: 1,
      isLeasing: false,
      isPurchased: false,
      userAlreadyRatedPost: false,
      userAlreadyRatedPostAuthor: false,
      dateFrom: new Date(),
      dateTo: new Date(),
      rentalDays: 0,
      remainingDays: 0,
      post: this.postService.emptyPost(),
      user: this.userService.emptyUser(),
      returnedFlag: false,
    }
  }
}
