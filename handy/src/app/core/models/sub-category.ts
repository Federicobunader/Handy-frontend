import { IIdentifiable } from "./IIdentifiable";
import { Category } from "./category";

export interface SubCategory extends IIdentifiable {
    name: string;
    category: Category;
  }
