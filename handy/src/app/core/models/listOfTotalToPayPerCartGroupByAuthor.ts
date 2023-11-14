import { IIdentifiable } from "./IIdentifiable";
import { TotalToPayPerAuthor } from "./total-to-pay-per-author";
import { TotalToPayPerCart } from "./total-to-pay-per-cart";
import { User } from "./user";

export interface ListOfTotalToPayPerCartGroupByAuthor{
  totalToPayPerAuthor: TotalToPayPerAuthor,
  listOfTotalToPayPerCart: TotalToPayPerCart[],
}
