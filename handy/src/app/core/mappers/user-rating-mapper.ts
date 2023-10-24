import { Injectable } from "@angular/core";
import { PostMapper } from "./post-mapper";
import { UserMapper } from "./user-mapper";
import { Comment } from "../models/comment";
import { PostRating } from "../models/postRating";
import { UserRating } from "../models/userRating";
import { CartMapper } from "./cart-mapper";

@Injectable({
  providedIn: 'root'
})
export class UserRatingMapper {
  userMapper = new UserMapper();
  cartMapper = new CartMapper();

  dtoToUserRating(rating: any): UserRating {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      ratedUser: this.userMapper.dtoToUser(rating.ratedUserDTO),
      author: this.userMapper.dtoToUser(rating.authorDTO),
      cart: this.cartMapper.dtoToCart(rating.cart),
    }
  };

  userRatingToDto(rating: UserRating): any {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      ratedUserDTO: this.userMapper.dtoToUser(rating.ratedUser),
      authorDTO: this.userMapper.userToDto(rating.author),
      cartDTO: this.cartMapper.cartToDto(rating.cart),
    }
  };
}
