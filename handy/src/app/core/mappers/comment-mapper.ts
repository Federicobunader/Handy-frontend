import { Injectable } from "@angular/core";
import { PostMapper } from "./post-mapper";
import { UserMapper } from "./user-mapper";
import { Comment } from "../models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentMapper {
  postMapper = new PostMapper();
  userMapper = new UserMapper();

  dtoToComment (comment: any): Comment {
    return {
      // variable del front: variable del back
      id: comment?.id ? comment.id : 0,
      content: comment?.content ? comment.content : 1,
      score: comment?.score ? comment.score : 0,
      parentComment: comment.parentCommentDTO ? this.dtoToComment(comment.parentCommentDTO) : null,
      post: this.postMapper.dtoToPost(comment.postDTO),
      author: this.userMapper.dtoToUser(comment.authorDTO),
      answers: [],
    }
  };

  commentToDto(comment: Comment, processedComments: Comment[] = []): any {
    if (processedComments.includes(comment)) {
      return null; // or however you want to handle this case
    }
    processedComments.push(comment);
    return {
      id: comment?.id ? comment.id : 0,
      content: comment?.content ? comment.content : 1,
      score: comment?.score ? comment.score : 0,
      parentCommentDTO: comment?.parentComment ? this.commentToDto(comment.parentComment, processedComments) : null,
      postDTO: this.postMapper.postToDto(comment.post),
      authorDTO: this.userMapper.userToDto(comment.author)
    };
  };
}
