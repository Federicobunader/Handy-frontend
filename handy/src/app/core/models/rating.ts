import { IIdentifiable } from "./IIdentifiable";
import { User } from "./user";


export interface Rating extends IIdentifiable{
  score: number,
  description: string,
  author: User,
}
