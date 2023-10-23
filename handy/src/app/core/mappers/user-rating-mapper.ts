import { Injectable } from "@angular/core";
import { PostMapper } from "./post-mapper";
import { UserMapper } from "./user-mapper";
import { Comment } from "../models/comment";
import { PostRating } from "../models/postRating";
import { UserRating } from "../models/userRating";

@Injectable({
  providedIn: 'root'
})
export class UserRatingMapper {
  userMapper = new UserMapper();

  dtoToUserRating(rating: any): UserRating {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      ratedUser: this.userMapper.dtoToUser(rating.ratedUserDTO),
      author: this.userMapper.dtoToUser(rating.authorDTO)
    }
  };

  userRatingToDto(rating: UserRating): any {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      ratedUserDTO: this.userMapper.dtoToUser(rating.ratedUser),
      authorDTO: this.userMapper.userToDto(rating.author)
    }
  };
}
