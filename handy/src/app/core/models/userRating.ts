
import { IIdentifiable } from "./IIdentifiable";
import { Cart } from "./cart";
import { User } from "./user";


export interface UserRating extends IIdentifiable{
  score: number,
  description: string,
  author: User,
  ratedUser: User,
  cart: Cart,
  creationDate: any,
}
