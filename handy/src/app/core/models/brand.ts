import { IIdentifiable } from "./IIdentifiable";
import { Category } from "./category";

export interface Brand extends IIdentifiable {
    name: string;
    category: Category;
  }
