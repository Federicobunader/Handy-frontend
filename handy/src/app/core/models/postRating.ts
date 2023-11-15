import { IIdentifiable } from "./IIdentifiable";
import { Cart } from "./cart";
import { Post } from "./post";
import { User } from "./user";

export interface PostRating extends IIdentifiable{
  score: number,
  description: string,
  author: User,
  post: Post,
  cart: Cart,
  creationDate: any,
}
