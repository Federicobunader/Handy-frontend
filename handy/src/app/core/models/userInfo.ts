import { IIdentifiable } from "./IIdentifiable";
import { Address } from "./address";
import { PaymentMethod } from "./paymentMethod";
import { Photo } from "./photo";

export interface UserInfo{
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}
