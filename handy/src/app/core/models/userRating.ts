
import { IIdentifiable } from "./IIdentifiable";
import { User } from "./user";


export interface UserRating extends IIdentifiable{
  score: number,
  description: string,
  author: User,
  ratedUser: User,
}
