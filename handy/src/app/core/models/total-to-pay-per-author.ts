import { IIdentifiable } from "./IIdentifiable";
import { TotalToPayPerCart } from "./total-to-pay-per-cart";
import { User } from "./user";

export interface TotalToPayPerAuthor extends IIdentifiable{
  author: User;
  from: User;
  totalToPay: number;
  purchasedFlag: boolean;
}
