import { Injectable } from "@angular/core";
import { PostMapper } from "./post-mapper";
import { UserMapper } from "./user-mapper";
import { Comment } from "../models/comment";
import { PostRating } from "../models/postRating";

@Injectable({
  providedIn: 'root'
})
export class PostRatingMapper {
  postMapper = new PostMapper();
  userMapper = new UserMapper();

  dtoToPostRating(rating: any): PostRating {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      post: this.postMapper.dtoToPost(rating.ratedPostDTO),
      author: this.userMapper.dtoToUser(rating.authorDTO)
    }
  };

  postRatingToDto(rating: PostRating): any {
    return {
      // variable del front: variable del back
      id: rating?.id ? rating.id : 0,
      score: rating?.score ? rating.score : 0,
      description: rating?.description ? rating.description : '',
      ratedPostDTO: this.postMapper.postToDto(rating.post),
      authorDTO: this.userMapper.userToDto(rating.author)
    }
  };
}
