import { IIdentifiable } from "./IIdentifiable";
import { Country } from "./country";

export interface Province extends IIdentifiable{
    name: string;
    country: Country;
  }