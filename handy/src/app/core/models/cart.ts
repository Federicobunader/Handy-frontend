import { IIdentifiable } from "./IIdentifiable";
import { Post } from "./post";
import { User } from "./user";

export interface Cart extends IIdentifiable{
  amount: number,
  isLeasing: boolean,
  dateFrom: Date,
  dateTo : any,
  rentalDays: number,
  remainingDays: number,
  userAlreadyRatedPost: boolean,
  isPurchased: boolean,
  post: Post,
  user: User,
}