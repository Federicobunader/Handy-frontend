import { IIdentifiable } from "./IIdentifiable";
import { Cart } from "./cart";
import { TotalToPayPerAuthor } from "./total-to-pay-per-author";
import { User } from "./user";

export interface TotalToPayPerCart extends IIdentifiable{
  cart: Cart;
  itemCartTotalToPay: any;
  totalToPayPerAuthor: TotalToPayPerAuthor;
  from: User;
}
