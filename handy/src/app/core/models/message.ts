import { IIdentifiable } from "./IIdentifiable";
import { User } from "./user";

export interface Message extends IIdentifiable{
  text: string,
  to: User,
  from: User,
  timestamp: Date;
}
