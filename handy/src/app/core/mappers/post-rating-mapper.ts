import { Injectable } from "@angular/core";
import { PostMapper } from "./post-mapper";
import { UserMapper } from "./user-mapper";
import { Comment } from "../models/comment";
import { PostRating } from "../models/postRating";
import { CartMapper } from "./cart-mapper";

@Injectable({
  providedIn: 'root'
})
export class PostRatingMapper {
  postMapper = new PostMapper();
  userMapper = new UserMapper();
  cartMapper = new CartMapper();

  dtoToPostRating(rating: any): PostRating {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      post: this.postMapper.dtoToPost(rating.ratedPostDTO),
      author: this.userMapper.dtoToUser(rating.authorDTO),
      cart: this.cartMapper.dtoToCart(rating.cart),
    }
  };

  postRatingToDto(rating: PostRating): any {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      ratedPostDTO: this.postMapper.postToDto(rating.post),
      authorDTO: this.userMapper.userToDto(rating.author),
      cartDTO: this.cartMapper.cartToDto(rating.cart),
    }
  };
}
