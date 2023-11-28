import { IIdentifiable } from "./IIdentifiable";
import { Address } from "./address";
import { Photo } from "./photo";
import { Product } from "./product";
import { User } from "./user";

export interface Post extends IIdentifiable{
  title: string;
  product: Product;
  address: Address;
  author: User;
  stock: number;
  isActive: boolean;
  isLeasing: boolean;
  photos : Photo [];
  score: number;
}
