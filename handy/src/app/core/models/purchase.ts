import { IIdentifiable } from "./IIdentifiable";
import { Address } from "./address";
import { PaymentMethod } from "./paymentMethod";
import { TotalToPayPerAuthor } from "./total-to-pay-per-author";
import { User } from "./user";

export interface Purchase extends IIdentifiable{
  totalToPayPerAuthor: TotalToPayPerAuthor;
  paymentMethod: PaymentMethod;
  deliveryPoint: Address;
  buyer: User;
  seller: User;
  creationDate: Date,
  }
