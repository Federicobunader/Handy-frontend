
import { IIdentifiable } from "./IIdentifiable";
import { Post } from "./post";
import { User } from "./user";

export interface Comment extends IIdentifiable{
  content: string,
  score: number,
  parentComment: Comment | null,
  post: Post,
  author: User,
  answers: Comment[],
  creationDate: Date,
}
