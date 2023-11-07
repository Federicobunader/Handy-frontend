import { IIdentifiable } from "./IIdentifiable";
import { Brand } from "./brand";
import { SubCategory } from "./sub-category";

export interface Product extends IIdentifiable{
  name: string;
  description: string;
  brand: Brand;
  subCategory: SubCategory;
  rentalPrice: number;
  salesPrice?: number;
  depositPrice: number;
  }
